
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserContext _context;
    private readonly IConfiguration _config;
    public UserController(UserContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    } 

    [HttpPost]
    public async Task<ActionResult<FrontendUserResponse>> GetOrCreateUser()
    {
        var credentialExists = Request.Headers.TryGetValue("Credential", out var credential);
        var ipExists = Request.Headers.TryGetValue("IpAddress", out var ipAddress);
        if (!credentialExists || !ipExists) return BadRequest();

        var payload = await GoogleJsonWebSignature.ValidateAsync(credential);
        if (payload == null) return Unauthorized();

        var userIdHash = Hasher.GetHash(payload.Subject);
        var userExists = _context.UserExists(userIdHash, out var user);
        if (userExists) return Ok(new FrontendUserResponse(user!));

        var request = new NewUserRequest {
            UserId = payload.Subject,
            IpAddress = ipAddress!,
            Nickname = payload.GivenName
        };
        user = new User(request, _config);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new FrontendUserResponse(user));
    }
 
    [HttpPatch("{userHash}/nickname")]
    public async Task<IActionResult> PutNickname(string userHash, [FromBody] string nickname) // Adds a nickname to the user. 
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        user!.Nickname = nickname; // User defined in UserExists. The "!" prevents  "dereference null reference".
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPatch("{userHash}/theme")]
    public async Task<IActionResult> PutTheme(string userHash, [FromBody] string theme) // Adds a theme to the user. 
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        user! .Theme = theme;   
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPatch("{userHash}/locations")]
    public async Task<IActionResult> PutLocations(string userHash, [FromBody] string[] locationUrls) // Adds a new location to the user. 
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        user!.Locations.Clear();
        locationUrls.ToList().ForEach(locationUrl => user.Locations.Add(new Location(locationUrl, _config)));
        await _context.SaveChangesAsync();

        return NoContent();
    }




    // FOR TESTING PURPOSES -- REMOVE BEFORE GO LIVE OR IMPLEMENT STRICTER CORS

    [HttpGet("/testing/User/{userHash}")]
    public ActionResult<FrontendUserResponse> GetUserByHash(string userHash)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();
        return new FrontendUserResponse(user!);
    }

    [HttpGet("/testing/User")]
    public ActionResult<IEnumerable<FrontendUserResponse>> GetAllUsers()
    {
        return _context.Users
            .Include(user => user.Locations)
            .Select(user => new FrontendUserResponse(user))
            .ToList();
    }

    [HttpPost("/testing/User")]
    public async Task<ActionResult<User>> PostTestUser(NewUserRequestForTesting request)
    {
        var user = new User(request, _config);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUser", new { userHash = user.UserIdHash }, new FrontendUserResponse(user));
    }

    [HttpDelete("/testing/User/{userHash}")]
    public async Task<IActionResult> DeleteUser(string userHash)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        _context.Users.Remove(user!);
        await _context.SaveChangesAsync();

        return Ok();
    }
}


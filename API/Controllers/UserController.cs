
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

    [HttpGet]
    public ActionResult<IEnumerable<UserResponse>> GetUsers()
    {
        return _context.Users
            .Include(user => user.Locations)
            .Select(user => new UserResponse(user))
            .ToList();
    }

    [HttpGet("{userHash}")]
    public ActionResult<UserResponse> GetUser(string userHash)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();
        return new UserResponse(user!);
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUser(PostTestUserRequest userRequest)
    {
        var user = new User(userRequest, _config);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUser", new { userHash = user.EmailHash }, new UserResponse(user));
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

    [HttpDelete("{userHash}")]
    public async Task<IActionResult> DeleteUser(string userHash)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        _context.Users.Remove(user!);
        await _context.SaveChangesAsync();

        return Ok();
    }
}


namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly UserContext _context;
    public UserController(UserContext context) => _context = context;

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
        var user = new User(userRequest);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetUser", new { userHash = user.EmailHash }, new UserResponse(user));
    }

    [HttpPut("{userHash}/nickname")]
    public async Task<IActionResult> PutNickname(string userHash, [FromBody] string nickname)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        user!.Nickname = nickname;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{userHash}/theme")]
    public async Task<IActionResult> PutTheme(string userHash, [FromBody] string theme)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        user!.Theme = theme;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{userHash}/locations")]
    public async Task<IActionResult> PutLocations(string userHash, [FromBody] string[] locations)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        user!.Locations.Clear();
        locations.ToList().ForEach(location => user.Locations.Add(new Location() { Name = location }));
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

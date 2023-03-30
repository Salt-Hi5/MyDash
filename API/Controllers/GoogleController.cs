using API.Services;

namespace API.Controllers;

/*
PURPOSE: Manage the API calls to Google, which is used for Calendar, Gmail, Gdrive. 

*/


[Route("api/[controller]")]
[ApiController]
public class GoogleController : ControllerBase
{
    private readonly UserContext _context;
    private readonly WeatherAPI _weatherApi;
    private readonly GoogleAPI _googleApi;
    public GoogleController(UserContext context, IConfiguration config)
    {
        _context = context;
        _weatherApi = new WeatherAPI(config);
        _googleApi = new GoogleAPI(context, config);
    }

    [HttpPost("authorizationCode/{userHash}")]
    public async Task<IActionResult> PostAuthorizationCode(string userHash)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        var authorisationCodeExists = Request.Headers.TryGetValue("AuthorisationCode", out var authorisationCode);
        if (!authorisationCodeExists) return BadRequest();

        var tokensSuccessfullyRetrieved = await _googleApi.VerifyAuthorisationCode(authorisationCode!, user!);
        if (!tokensSuccessfullyRetrieved) return Unauthorized();

        return Ok();
    }

    [HttpGet("calendarEvents/{userHash}")]
    public ActionResult<List<Event>> GetCalendarEvents(string userHash) // Gets the weather for all locations that the current user (inside the argment) has. 
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        var events = _googleApi.GetEvents(user!);
        return Ok(events);
    }
}

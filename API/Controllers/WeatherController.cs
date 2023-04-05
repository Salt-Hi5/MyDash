using API.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WeatherController : ControllerBase
{
    private readonly UserContext _context;
    private readonly WeatherAPI _weatherApi;
    public WeatherController(UserContext context, IConfiguration config)
    {
        _context = context;
        _weatherApi = new WeatherAPI(config);
    }

    [HttpGet("{userHash}")]
    public ActionResult<FrontendWeatherResponse> GetWeather(string userHash)
    {
        var userFound = _context.UserExists(userHash, out var user);
        if (!userFound) return NotFound();

        return new FrontendWeatherResponse(user, _weatherApi);
    }

    [HttpGet("location/{searchTerm}")]
    public async Task<List<WeatherApiLocation>> GetWeatherLocations(string searchTerm)
    {
        return await _weatherApi.SearchLocations(searchTerm);
    }
}

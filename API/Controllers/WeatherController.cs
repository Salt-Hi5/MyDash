using API.Services;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WeatherController: ControllerBase
{
    WeatherAPI _weatherApi;
    public WeatherController(IConfiguration config)
    {
        _weatherApi = new WeatherAPI(config);
    } 

    [HttpGet("location/{searchTerm}")]
    public async Task<List<WeatherApiLocation>> GetSomeRandomTimezone(string searchTerm)
    {
        return await _weatherApi.SearchLocations(searchTerm);
    }

    [HttpGet("weather/{locationUrl}")]
    public async Task<WeatherApiWeatherResponse> GetWeather(string locationUrl)
    {
        return await _weatherApi.CurrentWeather(locationUrl);
    }


    // Testing requests
    [HttpGet("/url")]
    public string[] GetUrls()
    {
        return _weatherApi.GetApiUrl();
    }
}

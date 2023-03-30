
namespace API.Services;

/*
PURPOSE: Used to manage the HTTP fetches from the frontend to the backend API. 
For an otherview of how the WeatherAPI works, see "WeatherController.cs" in the Backend. 
*/

public class WeatherAPI
{
    private readonly IConfiguration _config;
    private readonly string _apiKey;
    private HttpClient _client;
    private string _baseUrl;
    private string _locationSearchUrl;
    private string _currentWeatherUrl;
    private string _timeZoneUrl;

    public WeatherAPI(IConfiguration config) // Constructor 
    {
        _config = config;
        _client = new HttpClient();
        _apiKey = _config["WeatherApi"]!;
        _baseUrl = "https://api.weatherapi.com/v1";
        _locationSearchUrl = $"{_baseUrl}/search.json?key={_apiKey}&q=";
        _currentWeatherUrl = $"{_baseUrl}/current.json?key={_apiKey}&q=";
        _timeZoneUrl = $"{_baseUrl}/timezone.json?key={_apiKey}&q=";   
    }

    public async Task<List<WeatherApiLocation>> SearchLocations(string searchString) // Gets the location from that the user searched for, e.g "London". 
    {
        var response = await _client.GetAsync(_locationSearchUrl + searchString);
        var locations = await JsonSerializer.DeserializeAsync<List<WeatherApiLocation>>(await response.Content.ReadAsStreamAsync());

        return locations ?? new List<WeatherApiLocation>();
    }

    public async Task<string> Timezone(string locationUrl)  
    {
        var response = await _client.GetStreamAsync(_timeZoneUrl + locationUrl);
        var timezoneResponse = await JsonSerializer.DeserializeAsync<WeatherApiTimezoneResponse>(response);
        return timezoneResponse?.Location?.Timezone ?? "No timezone could be retrieved";
    }

    public async Task<WeatherApiWeatherResponse> CurrentWeather(string location)
    {
        var response = await _client.GetAsync(_currentWeatherUrl + location);
        var currentWeather = await JsonSerializer.DeserializeAsync<WeatherApiWeatherResponse>(await response.Content.ReadAsStreamAsync());

        return currentWeather ?? new WeatherApiWeatherResponse();
    }
}

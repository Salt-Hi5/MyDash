
namespace API.Services;

public class WeatherAPI
{
    private HttpClient _client;
    private string _apiKey;
    private string _baseUrl;
    private string _locationSearchUrl;
    private string _currentWeatherUrl;

    public WeatherAPI()
    {
        _client = new HttpClient();
        _apiKey = ApiKeys.WeatherApi;
        _baseUrl = "https://api.weatherapi.com/v1";
        _locationSearchUrl = $"{_baseUrl}/search.json?key={_apiKey}&q=";
        _currentWeatherUrl = $"{_baseUrl}/current.json?key={_apiKey}&q=";
    }

    public async Task<List<WeatherLocation>> SearchLocations(string searchString)
    {
        var response = await _client.GetAsync(_locationSearchUrl + searchString);
        var locations = await JsonSerializer.DeserializeAsync<List<WeatherLocation>>(await response.Content.ReadAsStreamAsync());

        return locations ?? new List<WeatherLocation>();
    }

    public async Task<WeatherResponse> CurrentWeather(string location)
    {
        var response = await _client.GetAsync(_currentWeatherUrl + location);
        var currentWeather = await JsonSerializer.DeserializeAsync<WeatherResponse>(await response.Content.ReadAsStreamAsync());

        return currentWeather ?? new WeatherResponse();
    }
}

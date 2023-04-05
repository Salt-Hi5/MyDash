
namespace API.Models;

public class WeatherApiWeatherResponse
{
    [JsonPropertyName("current")]
    public WeatherApiWeather? Weather { get; set; }
}
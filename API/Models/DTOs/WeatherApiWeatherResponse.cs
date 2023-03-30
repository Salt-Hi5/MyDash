
namespace API.Models;

/*
This is what we get from the EXTRENAL Weather API
*/

public class WeatherApiWeatherResponse
{
    [JsonPropertyName("current")]
    public WeatherApiWeather? Weather { get; set; }
}
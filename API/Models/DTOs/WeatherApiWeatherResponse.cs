
namespace API.Models; 

/*
This is what we get when searching for the weather. 
*/

public class WeatherApiWeatherResponse
{
    [JsonPropertyName("current")]
    public WeatherApiWeather? Weather {get; set;}
}
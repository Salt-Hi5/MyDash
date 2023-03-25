
namespace API.Models;

public class WeatherApiWeatherCondition
{
    [JsonPropertyName("text")]
    public string? Text { get; set; }

    [JsonPropertyName("icon")]
    public string? Icon { get; set; } // Is a string-url to an icon that shows the current weather. 

    [JsonPropertyName("code")]
    public int? Code { get; set; }
}
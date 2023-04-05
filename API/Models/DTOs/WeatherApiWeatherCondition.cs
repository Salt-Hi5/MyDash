
namespace API.Models;

public class WeatherApiWeatherCondition
{
    [JsonPropertyName("text")]
    public string? Text { get; set; }

    [JsonPropertyName("icon")]
    public string? Icon { get; set; } 

    [JsonPropertyName("code")]
    public int? Code { get; set; }
}
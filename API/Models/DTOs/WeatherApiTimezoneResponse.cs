
namespace API.Models;

public class WeatherApiTimezoneResponse
{
    [JsonPropertyName("location")]
    public WeatherApiLocation? Location { get; set; }
}

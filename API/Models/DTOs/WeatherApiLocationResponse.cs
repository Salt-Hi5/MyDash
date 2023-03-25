
namespace API.Models; 

public class WeatherApiLocationResponse
{
    [JsonPropertyName("location")]
    public WeatherApiLocation? Location {get; set;}
}

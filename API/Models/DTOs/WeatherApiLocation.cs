
namespace API.Models;

public class WeatherApiLocation
{
    [JsonPropertyName("name")] 
    public string? Name { get; set; }
    [JsonPropertyName("region")]
    public string? Region { get; set; }
    [JsonPropertyName("country")]
    public string? Country { get; set; }

    [JsonPropertyName("tz_id")]
    public string? Timezone { get; set; }
    [JsonPropertyName("url")]
    public string? Url { get; set; }
}

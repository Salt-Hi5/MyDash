
namespace API.Models; 

public class WeatherLocation
{
    public string Name {get; set;}
    public string Region {get; set;}
    public string Country {get; set;}
    [JsonPropertyName("tz_id")]
    public string? Timezone {get; set;}
    public string? Url {get; set;}
}


namespace API.Models;

/*
This DTO is needed because the data coming from the API contains more info than what is in the database.
It also lacks data that is included in the database (e.g id). 
*/

public class WeatherApiLocation
{
    [JsonPropertyName("name")] // IMPORTANT for future reference: This jsonproperty must be LOWERCASE; otherwise it will not connect it to this model, which is HARD TO DEBUG because it doesn't show up as an error.
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

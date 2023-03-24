
namespace API.Models; 

/*
This DTO is needed because the data coming from the API contains more info than what is in the database.
It also lacks data that is included in the database (e.g id). 
*/

public class WeatherLocation
{
    public string Name {get; set;}
    public string Region {get; set;}
    public string Country {get; set;}

    [JsonPropertyName("tz_id")]
    public string? Timezone {get; set;}
    public string? Url {get; set;}
}

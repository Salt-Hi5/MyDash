
namespace API.Models; 

public class Location 
{
    [Key]
    [JsonIgnore]
    public int Id {get; set; }
    public List<User> Users {get; set;} 

    public string Name {get; set;} // The name of the location (e.g city)
    public string Region {get; set;}
    public string Country {get; set;}
    public string Timezone {get; set;}
    public string Url {get; set;}

    public Location() {} // The database needs an empty constructor to work if the model includes a non-empty constructor. 
    
    public Location(string url, IConfiguration config) 
    { 
        var weatherAPI = new WeatherAPI(config); 
        var location =  weatherAPI.SearchLocations(url).Result[0];
        var timezone = weatherAPI.Timezone(url).Result;

        Name = location.Name;
        Region = location.Region; 
        Country = location.Country;
        Timezone = timezone;  
        Url = location.Url;
    }
}

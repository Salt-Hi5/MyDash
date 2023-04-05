
namespace API.Models;


public class WeatherApiWeather
{
    [JsonPropertyName("last_updated_epoch")]                      
    public int? LastUpdatedEpoch { get; set; }

    [JsonPropertyName("last_updated")]                            
    public string? LastUpdated { get; set; }

    [JsonPropertyName("temp_c")]                                 
    public double? Temperature { get; set; }

    [JsonPropertyName("temp_f")]                                  
    public double? TemperatureFahrenheit { get; set; }

    [JsonPropertyName("is_day")]                                   
    public int? IsDay { get; set; }

    [JsonPropertyName("condition")]                                
    public WeatherApiWeatherCondition? Condition { get; set; }

    [JsonPropertyName("wind_mph")]                                 
    public double? WindMilesPerHour { get; set; }

    [JsonPropertyName("wind_kph")]                                 
    public double? WindKilometersPerHour { get; set; }

    [JsonPropertyName("wind_degree")]                               
    public int? WindDegree { get; set; }

    [JsonPropertyName("wind_dir")]                                 
    public string? WindDirection { get; set; }

    [JsonPropertyName("pressure_mb")]                              
    public double? PressureMillibar { get; set; }

    [JsonPropertyName("pressure_in")]                             
    public double? PressureInches { get; set; }

    [JsonPropertyName("precip_mm")]                                
    public double? PrecipitationMillimeter { get; set; }

    [JsonPropertyName("precip_in")]                                
    public double? PrecipitationInches { get; set; }

    [JsonPropertyName("humidity")]                                
    public int? Humidity { get; set; }

    [JsonPropertyName("cloud")]                                    
    public int? Cloud { get; set; }

    [JsonPropertyName("feelslike_c")]                              
    public double? FeelsLikeCelcius { get; set; }

    [JsonPropertyName("feelslike_f")]                              
    public double? FeelsLikeFahrenheit { get; set; }

    [JsonPropertyName("vis_km")]                                   
    public double? VisibilityKilometers { get; set; }

    [JsonPropertyName("vis_miles")]                               
    public double? VisibilityMiles { get; set; }

    [JsonPropertyName("uv")]                                    
    public double? UV { get; set; }

    [JsonPropertyName("gust_mph")]                               
    public double? GustMilesPerHour { get; set; }

}



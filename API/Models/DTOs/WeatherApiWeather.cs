
namespace API.Models;


public class WeatherApiWeather
{
    [JsonPropertyName("last_updated_epoch")]                        //: 1679614200,
    public int? LastUpdatedEpoch { get; set; }

    [JsonPropertyName("last_updated")]                              //: "2023-03-23 23:30",
    public string? LastUpdated { get; set; }

    [JsonPropertyName("temp_c")]                                    //: 10.0,
    public double? Temperature { get; set; }

    [JsonPropertyName("temp_f")]                                    //: 50.0,
    public double? TemperatureFahrenheit { get; set; }

    [JsonPropertyName("is_day")]                                    //: 0,
    public int? IsDay { get; set; }

    [JsonPropertyName("condition")]                                 // : {"text": "Overcast", "icon": "//cdn.weatherapi.com/weather/64x64/night/122.png", "code": 1009}
    public WeatherApiWeatherCondition? Condition { get; set; }

    [JsonPropertyName("wind_mph")]                                  //: 13.6,
    public double? WindMilesPerHour { get; set; }

    [JsonPropertyName("wind_kph")]                                  //: 22.0,
    public double? WindKilometersPerHour { get; set; }

    [JsonPropertyName("wind_degree")]                               //: 230,
    public int? WindDegree { get; set; }

    [JsonPropertyName("wind_dir")]                                  //: "SW",
    public string? WindDirection { get; set; }

    [JsonPropertyName("pressure_mb")]                               //: 994.0,
    public double? PressureMillibar { get; set; }

    [JsonPropertyName("pressure_in")]                               //: 29.35,
    public double? PressureInches { get; set; }

    [JsonPropertyName("precip_mm")]                                 //: 0.5,
    public double? PrecipitationMillimeter { get; set; }

    [JsonPropertyName("precip_in")]                                 //: 0.02,
    public double? PrecipitationInches { get; set; }

    [JsonPropertyName("humidity")]                                  //: 87,
    public int? Humidity { get; set; }

    [JsonPropertyName("cloud")]                                     //: 100,
    public int? Cloud { get; set; }

    [JsonPropertyName("feelslike_c")]                               //: 7.3,
    public double? FeelsLikeCelcius { get; set; }

    [JsonPropertyName("feelslike_f")]                               //: 45.1,
    public double? FeelsLikeFahrenheit { get; set; }

    [JsonPropertyName("vis_km")]                                    //: 10.0,
    public double? VisibilityKilometers { get; set; }

    [JsonPropertyName("vis_miles")]                                //: 6.0,
    public double? VisibilityMiles { get; set; }

    [JsonPropertyName("uv")]                                       //: 1.0,
    public double? UV { get; set; }

    [JsonPropertyName("gust_mph")]                                 //: 19.7,
    public double? GustMilesPerHour { get; set; }

}



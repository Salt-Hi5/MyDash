
public class FrontendWeatherResponse 
{
    public List<FrontendWeatherResponseObject> WeatherArray { get; set; }

    public FrontendWeatherResponse(User user, WeatherAPI _weatherApi)
    {
        WeatherArray = new List<FrontendWeatherResponseObject>();
        user.Locations.ForEach(location => {
            WeatherArray.Add(new FrontendWeatherResponseObject() {
                Url = location.Url,
                Timezone = location.Timezone,
                CurrentWeather = _weatherApi.CurrentWeather(location.Url).Result.Weather
            });
        });
    }
}

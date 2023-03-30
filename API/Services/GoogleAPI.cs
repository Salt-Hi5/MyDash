using Google.Apis.Calendar.v3;
using Microsoft.Extensions.Primitives;

namespace API.Services;


/*
PURPOSE: Service functions for the GoogleController. See the GoogleController.cs for how these are used. 
*/

public class GoogleAPI
{
    private readonly IConfiguration _config;
    private readonly UserContext _context;
    private HttpClient _client;
    private string _url;
    private string _calendarId;

    public GoogleAPI(UserContext context, IConfiguration config) // Constructor 
    {
        _config = config;
        _context = context;
        _client = new HttpClient();
    
        //_apiKey = _config["WeatherApi"]!;
        _url = $"https://www.googleapis.com/calendar/v3/calendars/{_calendarId}/events/";
    }

    public async void VerifyAuthorisationCode(string authorisationCode, User user)
    {
        var tokenUrl = "https://oauth2.googleapis.com/token";

        var body = new GoogleAuthorisationRequestBody {
            ClientId = "",
            ClientSecret = "",
            AuthorizationCode = authorisationCode,
            GrantType = "authorization_code",
            RedirectUri = "https://salmon-island-036fee403.2.azurestaticapps.net"
        };

        var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8);
        var response = await _client.PostAsync(tokenUrl, content);

        //user.AccessToken = response.Content.
await _context.SaveChangesAsync();

// {
//   "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
//   "expires_in": 3920,
//   "token_type": "Bearer",
//   "scope": "https://www.googleapis.com/auth/drive.metadata.readonly",
//   "refresh_token": "1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
// }


        return true;
    }

    public List<Event> GetEvents(User user) 
    {
        var eventList = new List<Event>();

        return eventList;
    }


}

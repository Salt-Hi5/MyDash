using System.Net;
using Google.Apis.Calendar.v3;
using Microsoft.Extensions.Primitives;
using Google.Apis;
using System.Net.Http.Headers;

namespace API.Services;


/*
PURPOSE: Service functions for the GoogleController. See the GoogleController.cs for how these are used. 
*/

public class GoogleAPI
{
    private readonly IConfiguration _config;
    private readonly UserContext _context;
    private readonly HttpClient _client;

    private readonly string _tokenVerificationUrl, _redirectUri;
    private readonly string _clientId, _clientSecret;


    //private readonly string _calendarId;

    
    public GoogleAPI(UserContext context, IConfiguration config) // Constructor 
    {
        _config = config;
        _context = context;
        _client = new HttpClient();
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        _clientId = _config["Keys:Google:ClientId"]!;
        _clientSecret = _config["Keys:Google:ClientSecret"]!;

        _tokenVerificationUrl = "https://oauth2.googleapis.com/token";
        _redirectUri = "https://salmon-island-036fee403.2.azurestaticapps.net/google-callback";
    
        //_url = $"https://www.googleapis.com/calendar/v3/calendars/{_calendarId}/events/";
    }

    public async Task<bool> VerifyAuthorisationCode(string authorisationCode, User user)
    {
        var body = new AuthorisationRequestBody {
            ClientId = _clientId,
            ClientSecret = _clientSecret,
            AuthorizationCode = authorisationCode,
            GrantType = "authorization_code",
            RedirectUri = _redirectUri
        };
        var postContent = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8);
        var response = await _client.PostAsync(_tokenVerificationUrl, postContent);

        if (response.StatusCode != HttpStatusCode.OK) return false;
        var responseContent = JsonSerializer.Deserialize<AuthorisationResponseBody>(await response.Content.ReadAsStreamAsync());

        user.AccessToken = responseContent?.AccessToken;
        //user.RefreshToken = responseContent?.RefreshToken;
        await _context.SaveChangesAsync();

        return true;
    }

    public List<Event> GetEvents(User user) 
    {
        var eventList = new List<Event>();

        return eventList;
    }
}


namespace API.Models;

/*
This is a DTO class used whenever a client asks for a user in the database. 
*/
public class FrontendUserResponse
{
    public string? UserIdHash { get; set; }
    public List<FrontendLocationResponse>? Locations { get; set; }
    public string? Nickname { get; set; }
    public string? Theme { get; set; }
    public string? Picture { get; set; }

    public FrontendUserResponse() { }
    public FrontendUserResponse(User user) // Run every time someone requests a user. Extracts from the database the User with its Location. 
    {
        UserIdHash = user.UserIdHash;
        Locations = user.Locations.Select(location =>  // Creates and saves an object for the user's Locations. 
            new FrontendLocationResponse()
            {
                Name = location.Name,
                Region = location.Region,
                Country = location.Country,
                Timezone = location.Timezone,
                Url = location.Url,
            }
        ).ToList();
        Nickname = user.Nickname;
        Theme = user.Theme;
        Picture = user.Picture;
    }
}

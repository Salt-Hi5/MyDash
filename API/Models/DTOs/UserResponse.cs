
namespace API.Models;

/*
This is a DTO class used whenever a client asks for a user in the database. 
*/
public class UserResponse
{
    public string? EmailHash {get; set;}
    public List<LocationResponse>? Locations {get; set;}
    public string? Nickname {get; set;}
    public string? Theme {get; set;}

    public UserResponse() {}
    public UserResponse(User user) // Run every time someone requests a user. Extracts from the database the User with its Location. 
    {
        EmailHash = user.EmailHash; 
        Locations = user.Locations.Select(location =>  // Creates and saves an object for the user's Locations. 
            new LocationResponse()
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
    }
}

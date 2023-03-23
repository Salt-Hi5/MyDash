
namespace API.Models;

/*
This is a DTO class used whenever a client asks for a user in the database. 
*/
public class UserResponse
{
    public string EmailHash {get; set;}
    public List<string> Locations {get; set;}
    public string NickName {get; set;}
    public string Theme {get; set;} = "Standard";

    public UserResponse() {}
    public UserResponse(User user)
    {
        EmailHash = user.EmailHash;
        Locations = user.Locations.Select(location => location.Name).ToList();
        NickName = user.NickName;
        Theme = user.Theme;
    }
}
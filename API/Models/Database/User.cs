
namespace API.Models; 

public class User
{
    [Key]
    [JsonIgnore]
    public int Id {get; set; }
    public string UserIdHash {get; set;}
    public List<Location> Locations {get; set;} = new List<Location>();
    public string Nickname {get; set;}
    public string Theme {get; set;} = "Standard"; 

    public User() {}
    public User(NewUserRequest request, IConfiguration config)
    {
        UserIdHash = Hasher.GetHash(request.UserId);
        Locations.Add( new Location(request.IpAddress, config) );
        Nickname = request.Nickname;
    }
    public User(NewUserRequestForTesting request, IConfiguration config)
    {
        UserIdHash = Hasher.GetHash(request.UserId);
        Locations.Add( new Location(request.LocationUrl, config) );
        Nickname = request.Nickname;
    }
}
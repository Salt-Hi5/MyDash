
namespace API.Models; 

public class User
{
    [Key]
    [JsonIgnore]
    public int Id {get; set; }
    public string EmailHash {get; set;}
    public List<Location> Locations {get; set;} = new List<Location>();
    public string Nickname {get; set;}
    public string Theme {get; set;} = "Standard"; 

    public User() {}
    public User(PostTestUserRequest userRequest, IConfiguration config)
    {
        EmailHash = Hasher.GetHash(userRequest.Email);
        Locations.Add(new Location(userRequest.LocationUrl, config)); //  replace locationUrl with user IP
        Nickname = userRequest.Nickname;
    }
}
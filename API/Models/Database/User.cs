
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
    public User(PostTestUserRequest userRequest)
    {
        EmailHash = Hasher.GetHash(userRequest.Email);
        Locations.Add( new Location() 
        {
            Name = userRequest.Location,
            Region = "Some Region",
            Country = "Some Country",
            Timezone = userRequest.Location,
            Url = "Who the fuck knows?"
        });
        Nickname = userRequest.Nickname;
    }
}
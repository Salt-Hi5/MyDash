using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using API.Services.Hasher;

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
        Locations.Add( new Location() {Name = userRequest.Location} );
        Nickname = userRequest.Nickname;
    }
}
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models; 

public class User
{
    [Key]
    [JsonIgnore]
    public int Id {get; set; }
    public string EmailHash {get; set;}
    public List<Location> Locations {get; set;} = new List<Location>();
    public string NickName {get; set;}
    public string Theme {get; set;} = "Standard"; 

    public User() {}
    public User(PostTestUserRequest userRequest)
    {
        EmailHash = userRequest.Email;
        Locations.Add( new Location() {Name = userRequest.Location} );
        NickName = userRequest.NickName;
    }
}
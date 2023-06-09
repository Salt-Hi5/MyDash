
namespace API.Models;

public class User
{
    [Key]
    [JsonIgnore]
    public int Id { get; set; }
    public string UserIdHash { get; set; }
    public List<Location> Locations { get; set; } = new List<Location>();
    public string Nickname { get; set; }
    public string Theme { get; set; } = "Standard";
    public string? Picture { get; set; }
    public string? Email { get; set; }

    [JsonIgnore]
    public string? RefreshToken { get; set; }
    [JsonIgnore]
    public string? AccessToken { get; set; }

    public User() { }
    public User(NewUserRequest request, IConfiguration config)
    {
        UserIdHash = Hasher.GetHash(request.UserId);
        Locations.Add( new Location(request.IpAddress, config, true) );

        Nickname = request.Nickname;
        Picture = request.Picture;
        Email = request.Email; 
    }
    public User(NewUserRequestForTesting request, IConfiguration config)
    {
        UserIdHash = Hasher.GetHash(request.UserId);
        Locations.Add(new Location(request.LocationUrl, config));
        Nickname = request.Nickname;
        Picture = request.Picture;
    }
}
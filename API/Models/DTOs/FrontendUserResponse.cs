
namespace API.Models;

public class FrontendUserResponse
{
    public string? UserIdHash { get; set; }
    public List<FrontendLocationResponse>? Locations { get; set; }
    public string? Nickname { get; set; }
    public string? Theme { get; set; }
    public string? Picture { get; set; }
    public string? Email { get; set; }

    public FrontendUserResponse() { }
    public FrontendUserResponse(User user) 
    {
        UserIdHash = user.UserIdHash;
        Locations = user.Locations.Select(location =>   
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
        Email = user.Email; 
    }
}

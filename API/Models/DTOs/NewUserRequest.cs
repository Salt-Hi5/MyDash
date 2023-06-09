
namespace API.Models;

public class NewUserRequest
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public string IpAddress { get; set; }
    [Required]
    public string Nickname { get; set; }
    public string? Picture { get; set; }
    public string? Email { get; set; }

}
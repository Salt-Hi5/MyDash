
namespace API.Models;

public class NewUserRequestForTesting
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public string LocationUrl { get; set; }
    [Required]
    public string Nickname { get; set; }
    public string? Picture { get; set; }
}

namespace API.Models;

public class PostTestUserRequest
{
    [Required]
    public string Email {get; set;}
    [Required]
    public string Location {get; set;}
    [Required]
    public string Nickname {get; set;}
}
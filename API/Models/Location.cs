using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models; 

public class Location 
{
    [Key]
    [JsonIgnore]
    public int Id {get; set; }
    public string Name {get; set;}
    public List<User> Users {get; set;}     
}
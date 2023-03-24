
namespace API.Models; 

public class Location 
{
    [Key]
    [JsonIgnore]
    public int Id {get; set; }
    public List<User> Users {get; set;} 

    public string Name {get; set;}
    public string Region {get; set;}
    public string Country {get; set;}
    public string Timezone {get; set;}
    public string Url {get; set;}
}

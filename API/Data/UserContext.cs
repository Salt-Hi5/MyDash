
public class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options)
        : base(options)
    {
    }

    public DbSet<API.Models.User> Users { get; set; } = default!;
    public DbSet<API.Models.Location> Locations { get; set; } = default!;

    public bool UserExists(string userIdHash, out User? user)
    {
        user = Users.Include(user => user.Locations)
                    .FirstOrDefault(user => user.UserIdHash == userIdHash);
        return user != null;
    }
}

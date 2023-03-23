using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Services.Hasher;
using API.Models;

public class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options)
        : base(options)
    {
    }

    public DbSet<API.Models.User> Users { get; set; } = default!;
    public DbSet<API.Models.Location> Locations { get; set; } = default!;

    public bool UserExists(string emailHash, out User? user)
    {
        user = Users.Include(user => user.Locations)
                    .FirstOrDefault(user => user.EmailHash == emailHash);
        return user != null;
    }
}

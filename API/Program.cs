
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<UserContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyDashDbKey") ?? throw new InvalidOperationException("Connection string 'MyDashDbKey' not found.")));

// Add services to the container.
builder.Services.AddCors(options =>
    options.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyMethod()
            //.AllowCredentials()
            //.WithOrigins("https://calm-water-0269dfc03.2.azurestaticapps.net")
            .AllowAnyOrigin()
            .AllowAnyHeader()
    )
);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<UserContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyDashDbKey") ?? throw new InvalidOperationException("Connection string 'MyDashDbKey' not found.")));

builder.Configuration
    .AddJsonFile("appsettings.json",
    optional: true,
    reloadOnChange: true
);

builder.Services.AddCors(options =>
    options.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyMethod()
            .WithOrigins("https://salmon-island-036fee403.2.azurestaticapps.net/")
            .AllowAnyHeader()
    )
);

builder.Services.AddControllers();
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

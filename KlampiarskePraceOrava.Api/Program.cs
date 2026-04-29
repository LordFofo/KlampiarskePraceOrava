using System.Diagnostics;
using System.Text;
using KlampiarskePraceOrava.Api.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(opt =>
    opt.Limits.MaxRequestBodySize = 500 * 1024 * 1024); // 500 MB

var dbPath = Path.Combine(
    Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
    "klampiarske.db");

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite($"Data Source={dbPath}"));

var jwtKey = builder.Configuration["Jwt:Key"]!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(opt =>
        opt.AddDefaultPolicy(policy =>
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()));
}

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseCors();
    StartViteDev(app.Environment.ContentRootPath);
}
else
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (!app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("index.html");
}

app.Run();

static void StartViteDev(string contentRoot)
{
    var webRoot = Path.GetFullPath(Path.Combine(contentRoot, "..", "KlampiarskePraceOrava.Web"));
    if (!Directory.Exists(webRoot)) return;

    var isWindows = OperatingSystem.IsWindows();
    var process = new Process
    {
        StartInfo = new ProcessStartInfo
        {
            FileName = isWindows ? "cmd" : "sh",
            Arguments = isWindows ? "/c npm run dev" : "-c \"npm run dev\"",
            WorkingDirectory = webRoot,
            UseShellExecute = true,
            CreateNoWindow = false,
        }
    };
    process.Start();
}

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace KlampiarskePraceOrava.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IConfiguration config) : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var adminUsername = config["Admin:Username"];
        var adminPassword = config["Admin:Password"];

        if (request.Username != adminUsername || request.Password != adminPassword)
            return Unauthorized(new { message = "Nesprávne prihlasovacie údaje." });

        var token = GenerateToken();
        return Ok(new { token });
    }

    private string GenerateToken()
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddHours(int.Parse(config["Jwt:ExpiresInHours"]!));

        var token = new JwtSecurityToken(
            issuer: config["Jwt:Issuer"],
            audience: config["Jwt:Audience"],
            claims: [new Claim(ClaimTypes.Role, "Admin")],
            expires: expires,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public record LoginRequest(string Username, string Password);

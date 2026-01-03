using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ReactStore.Domain;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ReactStore.Infrastructure
{
    public static class JwtTokenGenerator
    {
        public static string Generate(User user, IConfiguration config)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),new Claim(ClaimTypes.Role, user.Role)
        };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"]!));

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],        // ✅ REQUIRED
        audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}

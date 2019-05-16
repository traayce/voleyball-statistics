using System;
using System.Security.Cryptography;
using System.Text;

namespace Services.Helpers.Extensions
{
    public static class StringExtensions
    {
        public static string GetHash(this string text)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}
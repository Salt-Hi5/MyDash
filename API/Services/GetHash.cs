using System.Security.Cryptography;
using System.Text;

namespace API.Services.Hasher;

public static class Hasher
{
    private static byte[] GetHashArray(string inputString)
    {
        using (HashAlgorithm algorithm = SHA256.Create())
        {
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }
    }

    public static string GetHash(string inputString)
    {
        var stringBuilder = new StringBuilder();
        foreach (byte b in GetHashArray(inputString))
        {
            stringBuilder.Append(b.ToString("X2"));
        }
        return stringBuilder.ToString();
    }
}
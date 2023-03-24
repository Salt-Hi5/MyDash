
/*

    This class is a very temporary solution until we figure out how to properly use the Azure Key Vault:
    https://learn.microsoft.com/en-us/aspnet/core/security/key-vault-configuration?view=aspnetcore-7.0

    I am aware that this will expose the API keys in the GitHub commit history, but wtf... yolo!

    — Anastasia

*/


namespace API.Services;

public static class ApiKeys
{
    public static string WeatherApi = "6632158bc1844b6ab19205805232303";
}

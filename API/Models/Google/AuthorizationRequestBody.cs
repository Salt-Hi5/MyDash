
public class GoogleAuthorisationRequestBody {

    [JsonPropertyName("client_i")]
    public string ClientId { get; set; }

    [JsonPropertyName("client_secret")]
    public string ClientSecret { get; set; }

    [JsonPropertyName("code")]
    public string AuthorizationCode { get; set; }

    [JsonPropertyName("grant_type")]
    public string GrantType { get; set; }

    [JsonPropertyName("redirect_uri")]
    public string RedirectUri { get; set; }
}
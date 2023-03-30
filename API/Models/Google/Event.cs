public class Event
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("summary")]
    public string Summary { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonPropertyName("location")]
    public string Location { get; set; }

    [JsonPropertyName("hangoutLink")]
    public string HangoutLink { get; set; }

    [JsonPropertyName("start")]
    public EventDate StartTime { get; set; }

    [JsonPropertyName("end")]
    public EventDate EndTime { get; set; }
}


public class EventDate // Based on the "start" and "end" properties of the json response, which all include date, dateTime, and timeZone 
{
    [JsonPropertyName("date")]
    public DateTime Date { get; set; }

    [JsonPropertyName("dateTime")]
    public DateTime DateTime { get; set; }

    [JsonPropertyName("timeZone")]
    public string TimeZone { get; set; }
}



/*

== The following is included from the JSON response from the Calendar API == 

"id": string,
  "summary": string,
  "description": string,
  "location": string,
  "hangoutLink": string,

 "start": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string
  },
  "end": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string
  },

*/
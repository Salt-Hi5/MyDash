
public class WeatherLocationApiCallTracker
{
    private WeatherAPI _weatherApi;
    private List<Task<List<WeatherApiLocation>?>> _activeApiCalls;

    public WeatherLocationApiCallTracker(IConfiguration config)
    {
        _weatherApi = new WeatherAPI(config);
    }

    public class ApiCall
    {
        public Task<List<WeatherApiLocation>?> Task { get; set; }
        public CancellationToken Token { get; set; }
    }

    public async Task NewApiCallAsync(string searchQuery)
    {
        var tokenSource = new CancellationTokenSource();
        CancellationToken token = tokenSource.Token;

        var currentCall = Task.Run(() => _weatherApi.SearchLocations(searchQuery, token), token);
        
        currentCall.
        _activeApiCalls.Add(currentCall);



        while (!currentCall.IsCompleted)
        {
            _activeApiCalls.Remove(currentCall);
            token.ThrowIfCancellationRequested();
        }

        currentCall.ContinueWith(antecedent => antecedent.Result);









        var currentCallIndex = _activeApiCalls.FindIndex(element => element == currentCall);
        _activeApiCalls.Where((call, index) => index < currentCallIndex).ToList().ForEach(call => call.)


        tokenSource.Cancel();



        // Just continue on this thread, or await with try-catch:
        try
        {
            await task;
        }
        catch (OperationCanceledException e)
        {
            Console.WriteLine($"{nameof(OperationCanceledException)} thrown with message: {e.Message}");
        }
        finally
        {
            tokenSource2.Dispose();
        }



        while (!currentCall.IsCompleted)
        {


            var finishedTask = await Task.WhenAny(_activeApiCalls);
            var finishedTaskIndex = _activeApiCalls.FindIndex(element => element == finishedTask);
            _activeApiCalls.RemoveRange(0, finishedTaskIndex);
        }
    }
}
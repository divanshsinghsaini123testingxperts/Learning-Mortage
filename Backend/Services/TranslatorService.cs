
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration;

namespace Backend.Services
{
    
    public class TranslationService
    {
        private readonly HttpClient _httpClient;
        private readonly string _key;
        private readonly string _region;
        private readonly string _endpoint;

        public TranslationService(IConfiguration config, IHttpClientFactory factory)
        {
            _httpClient = factory.CreateClient();
            _key = config["AzureTranslator:Key"];
            _region = config["AzureTranslator:Region"];
            _endpoint = config["AzureTranslator:Endpoint"];
        }

        public async Task<string> TranslateAsync(string text, string from = "en", string to = "fr")
        {
            var route = $"/translate?api-version=3.0&from={from}&to={to}";
            var uri = _endpoint + route;

            _httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _key);
            _httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Region", _region);
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var body = new object[] { new { Text = text } };
            var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(uri, content);
            var responseBody = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(responseBody);
            var translatedText = doc.RootElement[0].GetProperty("translations")[0].GetProperty("text").GetString();
            return translatedText;
        }
    }



}

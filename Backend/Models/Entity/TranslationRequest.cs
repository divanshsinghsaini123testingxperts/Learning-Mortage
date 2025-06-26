namespace Backend.Models.Entity
{
    public class TranslationRequest
    {
        public string Text { get; set; }
        public string SourceLang { get; set; } = "en";
        public string TargetLang { get; set; } = "fr";
    }
}

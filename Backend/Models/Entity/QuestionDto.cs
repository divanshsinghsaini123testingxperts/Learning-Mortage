namespace Backend.Models.Entity
{

    public class QuestionDto
    {
        public int Id { get; set; }

        public string? EngQuestion { get; set; }

        public string? FrenchQuestion { get; set; }

        public string AnswerFormat { get; set; } = null!;

        public int? FormId { get; set; }

        public List<string> Options { get; set; }

       
    }

}

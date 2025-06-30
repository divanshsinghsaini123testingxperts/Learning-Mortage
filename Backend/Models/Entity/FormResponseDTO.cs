namespace Backend.Models.Entity
{
    public class FormResponseDTO
    {
        public int QuestionId { get; set; }
        public int FormId { get; set;  }
        public int CustomerId { get; set; }
        public string Answer { get; set;  }
    }
}

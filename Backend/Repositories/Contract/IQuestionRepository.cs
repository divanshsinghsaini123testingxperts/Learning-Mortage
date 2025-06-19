using Backend.Models;
using Backend.Repositories.Contract;

namespace Backend.Repositories.Contract
{
    public interface IQuestionRepository : IGenericRepository<Question>
    {
        Task<List<Question>> GetByFormIdAsync(int formId); 
    }
}

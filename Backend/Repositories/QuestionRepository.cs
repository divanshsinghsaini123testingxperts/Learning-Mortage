using Backend.Models;
using Backend.Repositories.Contract;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class QuestionRepository : GenericRepository<Question>, IQuestionRepository
    {
        public QuestionRepository(MortgageDbContext context) : base(context)
        {

        }
        public async Task<List<Question>> GetByFormIdAsync(int formId)
        {
            return await _dbSet.Where(q => q.FormId == formId).ToListAsync();
        }
        //delete questions by question id is already implemented in GenericRepository
        //get question by id is already implemented in GenericRepository
        //update question is already implemented in GenericRepository
    }

}

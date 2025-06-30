using Backend.Models;
using Backend.Repositories;
using Backend.Repositories.Contract;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;

namespace Backend.Repositories
{
    public class FormDataRepository : GenericRepository<FormDatum>, IFormDataRepository
    {
        public FormDataRepository(MortgageDbContext context) : base(context)
        {
        }
        public async Task<bool> CheckCustomerIdWithFormId(int customerId, int formId)
        {
            return await _dbSet.AnyAsync(e => e.CustomerId == customerId && e.FormId == formId);
        }
    }
}

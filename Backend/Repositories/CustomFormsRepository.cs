using Backend.Models;
using Backend.Repositories.Contract;
using Microsoft.EntityFrameworkCore;
namespace Backend.Repositories
{
    public class CustomFormsRepository : GenericRepository<CustomForm>, ICustomFormsRepository
    {
        public CustomFormsRepository(MortgageDbContext context) : base(context)
        {

        }
        public async Task<List<CustomForm>> GetByEmployeeIdAsync(int employeeId)
        {
            return await _dbSet.Where(cf => cf.AdminId == employeeId).ToListAsync();
        }


    }
}

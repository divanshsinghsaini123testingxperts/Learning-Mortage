using Backend.Models;
using Backend.Models.Entity;
using Backend.Repositories.Contract;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class CustomerRepository : GenericRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(MortgageDbContext context) : base(context)
        {
        }

        public async Task<List<GetEmployeeDTO>> GetByEmployeeIdAsync(int employeeId)
        {
            var data = await _context.GetEmployeeDTO
                .FromSqlInterpolated($"EXEC GetCustomersByEmployeeId @EmployeeId = {employeeId}")
                .ToListAsync();

            return data;
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _dbSet.AnyAsync(c => c.Email == email);
        }
    }
}


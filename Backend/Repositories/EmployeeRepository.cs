using Backend.Models;
using Backend.Models.Entity;
using Backend.Repositories.Contract;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(MortgageDbContext context) : base(context)
        {
        }

        public async Task<bool> GetByEmailAndPasswordAsync(LoginDetailsDTO User)
        {
            return await _dbSet.AnyAsync(e => e.Email == User.Email && e.Password == User.Password);
        }

        public async Task<bool> GetByEmailAsync(string email)
        {
            return await _dbSet.AnyAsync(e => e.Email == email);
        }

        public async Task<bool> SaveNewPasswordAsync(LoginDetailsDTO User)
        {
            var employee = await _dbSet.SingleOrDefaultAsync(u => u.Email == User.Email);

            if (employee == null) // Compare the actual result to null
            {
                return false;
            }
            employee.Password = User.Password; // Ensure password is hashed in a real application
            _context.Entry(employee).State = EntityState.Modified;
            return true;
        }
    }
}
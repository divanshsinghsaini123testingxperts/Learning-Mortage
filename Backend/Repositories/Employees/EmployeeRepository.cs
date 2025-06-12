using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Employees
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly MyDbContext _context;
        public EmployeeRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<Employee?> GetByEmailAsync(string email)
        {
            return await _context.Employees.FirstOrDefaultAsync(e => e.Email == email);
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task AddAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<bool> ExistsByIdAsync(int empId)
        {
            var emp = await _context.Employees.FindAsync(empId);
            return emp != null;
        }

    }
}
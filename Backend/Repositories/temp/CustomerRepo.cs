using Backend.Models;
using Backend.Models.Entity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.temp
{
    public class CustomerRepo : ICustomerRepo
    {
        private readonly MyDbContext _context;
        public CustomerRepo(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetEmployeeDTO>> GetByEmployeeIdAsync(int employeeId)
        {
            var data = await _context.GetEmployeeDTO
            .FromSqlInterpolated($"EXEC GetCustomersByEmployeeId @EmployeeId = {employeeId}")
            .ToListAsync();

            return data;
        }

        public async Task<Customer?> GetByIdAsync(int customerId)
        {
            return await _context.Customers.FindAsync(customerId);
        }

        public async Task AddAsync(Customer customer)
        {
            await _context.Customers.AddAsync(customer);

        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _context.Customers.AnyAsync(c => c.Email == email);
        }

        public async Task<bool> DeleteByIdAsync(int customerId)
        {
            var result = await _context.Database.ExecuteSqlRawAsync(
                "EXEC DeleteCustomerById @CustomerId = {0}", customerId);

            if (result == 0)
            {
                return false; // No customer was deleted (possibly not found)
            }

            return true; // Customer deleted successfully
        }

        public async Task<bool> UpdateCustomer(int customerId, Customer customer)
        {
            var customerToUpdate = await GetByIdAsync(customerId);
            if (customerToUpdate == null)
            {
                return false; // Customer not found
            }

            customerToUpdate.Name = customer.Name;
            customerToUpdate.Email = customer.Email;
            customerToUpdate.Address = customer.Address;
            customerToUpdate.EmpId = customer.EmpId;

            return true; // Customer updated successfully
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
      

    }
}
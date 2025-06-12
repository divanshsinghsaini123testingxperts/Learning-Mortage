using Backend.Models;
using Backend.Models.Entity;

namespace Backend.Repositories.Customers
{
    public interface ICustomerRepository
    {
        Task<List<GetEmployeeDTO>> GetByEmployeeIdAsync(int employeeId);
        Task<Customer?> GetByIdAsync(int customerId);
        Task AddAsync(Customer customer);
        Task<bool> ExistsByEmailAsync(string email);
        Task<bool> DeleteByIdAsync(int customerId);
        Task SaveChangesAsync();
        Task<bool> UpdateCustomer(int customerId, Customer customer);
        // Add more methods as needed
    }
}
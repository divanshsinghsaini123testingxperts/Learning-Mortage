using Backend.Models;
using Backend.Models.Entity;

namespace Backend.Repositories.Contract
{
    public interface ICustomerRepository : IGenericRepository<Customer>
    {
        Task<List<GetEmployeeDTO>> GetByEmployeeIdAsync(int employeeId);
        Task<bool> ExistsByEmailAsync(string email);
    }
}
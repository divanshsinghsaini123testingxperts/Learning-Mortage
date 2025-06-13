using Backend.Models;
using Backend.Models.Entity;

namespace Backend.Repositories.Contract
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<bool> GetByEmailAsync(string email);
        Task<bool> GetByEmailAndPasswordAsync(LoginDetailsDTO User);
        Task<bool> SaveNewPasswordAsync(LoginDetailsDTO User);
    }
}
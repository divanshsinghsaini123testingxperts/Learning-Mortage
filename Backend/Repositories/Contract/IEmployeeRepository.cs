using Backend.Models;
using Backend.Models.Entity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Repositories.Contract
{
    public interface IEmployeeRepository : IGenericRepository<Employee>
    {
        Task<bool> GetByEmailAsync(string email);
        Task<bool> GetByEmailAndPasswordAsync(LoginDetailsDTO User);
        Task<bool> SaveNewPasswordAsync(LoginDetailsDTO User);
        Task<int> GetIdByEmail(string email);
    }
}
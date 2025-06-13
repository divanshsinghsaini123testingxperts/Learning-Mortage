using Backend.Models;

namespace Backend.Repositories.temp
{
    public interface IEmployeeRepo
    {
        //Task<Employee?> GetByEmailAsync(string email);
        Task<Employee?> GetByIdAsync(int id);
        Task AddAsync(Employee employee);
        Task SaveChangesAsync();
        // Add more methods as needed
        Task<bool> ExistsByIdAsync(int id);
    }
}
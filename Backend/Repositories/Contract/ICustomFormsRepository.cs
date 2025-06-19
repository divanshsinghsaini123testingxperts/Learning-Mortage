using Backend.Models;
namespace Backend.Repositories.Contract
{
    public interface ICustomFormsRepository : IGenericRepository<CustomForm>
    {
        Task<List<CustomForm>> GetByEmployeeIdAsync(int employeeId);
    }
}

using System.Linq.Expressions;

namespace Backend.Repositories.Contract
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id); 
        //Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T instance);
        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateAsync(T entity);
        Task<bool> ExistsAsync(int id);
        Task SaveChangesAsync();
    }
}
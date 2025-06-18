using Backend.Models;
using Backend.Repositories.Contract;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly MortgageDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(MortgageDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public virtual async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

       
        public virtual async Task AddAsync(T instance)
        {
            await _dbSet.AddAsync(instance);
        }
        public virtual async Task<bool> DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null) return false;
            
            _dbSet.Remove(entity);
            return true;
        }

        public virtual async Task<bool> UpdateAsync(T entity)
        {
            try
            {
                _dbSet.Update(entity);
            }
            catch (Exception)
            {
                // Handle any other exceptions
                return false;
            }
            return true;
        }

        public virtual async Task<bool> ExistsAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            return entity != null;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
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
                var keyProperty = typeof(T).GetProperty("Id");
                if (keyProperty != null)
                {
                    var id = keyProperty.GetValue(entity);
                    var trackedEntity = _context.ChangeTracker.Entries<T>()
                        .FirstOrDefault(e => keyProperty.GetValue(e.Entity).Equals(id));
                    if (trackedEntity != null)
                    {
                        trackedEntity.State = EntityState.Detached;
                    }
                }
                _dbSet.Update(entity);
                Console.WriteLine("Updated successfully----");
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
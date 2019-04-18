using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;
using DataContracts.Base;
using DataEntities.Base;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Base
{
    public abstract class GenericRepositoryBase<TEntity> : IGenericCommands<TEntity> where TEntity : Auditable, IEntity
    {
        protected DbContext DbContext;
        protected readonly DbSet<TEntity> Dbset;

        protected GenericRepositoryBase(DatabaseContext dbContext)
        {
            DbContext = dbContext;
            Dbset = dbContext.Set<TEntity>();
        }
        
        public virtual Task<TEntity> GetByIdAsync(int id)
        {
            return Dbset.FindAsync(id);
        }

        public virtual TEntity Add(TEntity entity)
        { 
            entity.CreatedAt = DateTime.UtcNow;
            return Dbset.Add(entity).Entity;
        }

        public virtual TEntity Delete(TEntity entity)
        {
            return Dbset.Remove(entity).Entity;
        }

        public virtual void Edit(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;
            UpdateAudit(entity);
        }

        public virtual Task<List<TEntity>> GetAllAsync()
        {
            return Dbset.ToListAsync();
        }
        
        public virtual IEnumerable<TEntity> GetAllMatching(Func<TEntity, bool> expression)
        {
            return Dbset.Where(expression);
        }
        
        private void UpdateAudit(TEntity entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
        }
    }
}
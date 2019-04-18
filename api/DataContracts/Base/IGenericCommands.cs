using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataContracts.Base
{
    public interface IGenericCommands<TEntity>
    {
        Task<TEntity> GetById(int id);
        Task<List<TEntity>> GetAll();

        TEntity Add(TEntity entity);

        TEntity Delete(TEntity entity);

        void Edit(TEntity entity);

    }
}
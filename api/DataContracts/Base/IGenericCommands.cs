using System;
using System.Collections.Generic;

namespace DataContracts.Base
{
    public interface IGenericCommands<TEntity>
    {
        TEntity GetById(int id);
        IList<TEntity> GetAll();

        TEntity Add(TEntity entity);

        TEntity Delete(TEntity entity);

        void Edit(TEntity entity);

    }
}
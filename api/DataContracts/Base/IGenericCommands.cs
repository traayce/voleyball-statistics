﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataContracts.Base
{
    public interface IGenericCommands<TEntity>
    {
        Task<TEntity> GetByIdAsync(int id);
        Task<List<TEntity>> GetAllAsync();

        TEntity Add(TEntity entity);

        TEntity Delete(TEntity entity);

        void Edit(TEntity entity);

        IEnumerable<TEntity> GetAllMatching(Func<TEntity, bool> expression);

    }
}
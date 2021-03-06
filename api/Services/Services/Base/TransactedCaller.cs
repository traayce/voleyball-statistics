using System;
using System.Threading.Tasks;
using DataContracts.Base;
using Infrastructure;

namespace Services.Services.Base
{
    public interface ITransactedCaller
    {
        object Execute<T>(Func<Task<T>> function);
        object Execute<T>(Func<T> function);
    }

    public class TransactedCaller : ITransactedCaller
    {
        private ITransactionDealerRepository _transactionProvider { get; set; }

        public TransactedCaller(ITransactionDealerRepository transactionProvider)
        {
            _transactionProvider = transactionProvider;
        }

        public object Execute<T>(Func<Task<T>> function)
        {
            _transactionProvider.BeginTransaction();

            try
            {
                var response = function().Result;
                _transactionProvider.CommitTransaction();
                return response;
            }
            catch (Exception e) when (e is RulesException)
            {
                _transactionProvider.RollbackTransaction();
                throw e;
            }
            catch (Exception ex)
            {
                _transactionProvider.RollbackTransaction();
                if (ex.InnerException is RulesException)
                {
                    throw ex.InnerException;
                }
                throw new RulesException(ex.ToString());
            }
        }
        
        public object Execute<T>(Func<T> function)
        {
            _transactionProvider.BeginTransaction();

            try
            {
                var response = function();
                _transactionProvider.CommitTransaction();
                return response;
            }
            catch (Exception e) when (e is RulesException)
            {
                _transactionProvider.RollbackTransaction();
                throw e;
            }
            catch (Exception ex)
            {
                _transactionProvider.RollbackTransaction();
                if (ex.InnerException is RulesException)
                {
                    throw ex.InnerException;
                }
                throw new RulesException(ex.ToString());
            }
        }
    }
}
using System;
using System.Threading.Tasks;
using DataContracts.Base;
using Infrastructure;

namespace Services.Services.Base
{
    public interface ITransactedCaller
    {
        object Execute<T>(Func<Task<T>> function);
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
            catch (RulesException)
            {
                _transactionProvider.RollbackTransaction();
                throw;
            }
            catch (Exception)
            {
                _transactionProvider.RollbackTransaction();
                throw new RulesException("Something went wrong");
            }
        }
    }
}
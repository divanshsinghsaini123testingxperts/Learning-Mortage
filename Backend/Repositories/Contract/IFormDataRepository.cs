using Backend.Models;
using Microsoft.SqlServer.Server;

namespace Backend.Repositories.Contract
{
    public interface IFormDataRepository : IGenericRepository<FormDatum>
    {
        Task<bool> CheckCustomerIdWithFormId(int CustomerId, int FormID);
    }
}

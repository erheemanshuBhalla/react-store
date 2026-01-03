using ReactStore.Application.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactStore.Application.Interfaces
{
    public interface ICategoryRepository
    {
        Task<int> CreateAsync(string name);
        Task<IEnumerable<CategoryDto>> GetAllAsync();
    }

}

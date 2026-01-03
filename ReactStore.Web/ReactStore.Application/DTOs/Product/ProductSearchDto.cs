using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactStore.Application.DTOs.Product
{
    public record ProductSearchDto(
        decimal? MinPrice,
        decimal? MaxPrice,
        int? CategoryId,
        string? Sort,
        int Page = 1,
        int PageSize = 10
    );

}

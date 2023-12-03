using Ardalis.Result;
using Ardalis.SharedKernel;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.List;

public class ListProductPricingsHandler : IQueryHandler<ListProductPricingsQuery, Result<IEnumerable<ProductPricingDto>>>
{
  private readonly IListProductPricingsQueryService _query;

  public ListProductPricingsHandler(IListProductPricingsQueryService query)
  {
    _query = query;
  }

  public async Task<Result<IEnumerable<ProductPricingDto>>> Handle(ListProductPricingsQuery request,
    CancellationToken cancellationToken)
  {
    var result = await _query.ListAsync();

    return Result.Success(result);
  }
}

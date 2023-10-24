using Ardalis.Result;
using Ardalis.SharedKernel;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.List;

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

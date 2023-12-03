using System.Collections.Immutable;
using Ardalis.Result;
using Ardalis.SharedKernel;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.Services;

namespace PriceCalculator.Calculation.UseCases.Currencies.List;

public class ListCurrenciesHandler : IQueryHandler<ListCurrenciesQuery, Result<ImmutableList<ISO._4217.Models.Currency>>>
{
    private readonly IListCurrenciesQueryService _query;

    public ListCurrenciesHandler(IListCurrenciesQueryService query)
    {
        _query = query;
    }

    public async Task<Result<ImmutableList<ISO._4217.Models.Currency>>> Handle(ListCurrenciesQuery request,
      CancellationToken cancellationToken)
    {
        var result = await _query.ListAsync();

        return Result.Success(result);
    }
}

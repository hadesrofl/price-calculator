using System.Collections.Immutable;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.Services;

namespace PriceCalculator.Calculation.Infrastructure.Data.Queries;

public class ListCurrenciesQueryService : IListCurrenciesQueryService
{
    public async Task<ImmutableList<ISO._4217.Models.Currency>> ListAsync() => await Task.FromResult(ISO._4217.CurrencyCodesResolver.Codes.ToImmutableList());
}
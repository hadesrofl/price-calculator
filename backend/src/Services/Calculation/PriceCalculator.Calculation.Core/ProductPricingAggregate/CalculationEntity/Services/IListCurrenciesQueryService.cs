using System.Collections.Immutable;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.Services;

public interface IListCurrenciesQueryService
{
    Task<ImmutableList<ISO._4217.Models.Currency>> ListAsync();
}

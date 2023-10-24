using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.List;

public interface IListProductPricingsQueryService
{
  Task<IEnumerable<ProductPricingDto>> ListAsync();
}

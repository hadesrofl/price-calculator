using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.List;

public interface IListProductPricingsQueryService
{
  Task<IEnumerable<ProductPricingDto>> ListAsync();
}

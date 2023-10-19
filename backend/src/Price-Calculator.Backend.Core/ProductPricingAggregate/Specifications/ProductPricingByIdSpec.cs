using Ardalis.Specification;

namespace Price_Calculator.Backend.Core.ProductPricingAggregate.Specifications;

public class ProductPricingByIdSpec : Specification<ProductPricing>
{
  public ProductPricingByIdSpec(int productPricingId)
  {
    Query
      .Where(productPricing => productPricing.Id == productPricingId)
      .Include(productPricing => productPricing.Product)
      .Include(productPricing => productPricing.Product.Category)
      .Include(productPricing => productPricing.Calculation)
      .Include(productPricing => productPricing.Calculation.Costs);
  }
}

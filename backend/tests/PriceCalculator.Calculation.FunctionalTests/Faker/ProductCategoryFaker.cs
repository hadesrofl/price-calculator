using Bogus;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.ProductEntity.ValueObjects;

namespace PriceCalculator.Calculation.FunctionalTests.Faker;

public class ProductCategoryFaker : Faker<ProductCategory>
{
  public ProductCategoryFaker()
  {
    RuleFor(pc => pc.Name, f => f.Commerce.Categories(1)[0]);
  }
}

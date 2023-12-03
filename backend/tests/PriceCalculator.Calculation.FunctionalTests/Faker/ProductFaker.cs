using Bogus;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.ProductEntity;

namespace PriceCalculator.Calculation.FunctionalTests.Faker;

public class ProductFaker : Faker<Product>
{
  public ProductFaker()
  {
    RuleFor(p => p.Name, f => f.Commerce.Product());
    RuleFor(p => p.Category, new ProductCategoryFaker().Generate());
  }
}

using Bogus;
using PriceCalculator.Calculation.Core.ProductPricingAggregate;

namespace PriceCalculator.Calculation.FunctionalTests.Faker;

public class ProductPricingFaker : Faker<ProductPricing>
{
  public ProductPricingFaker()
  {
    RuleFor(pp => pp.Product, new ProductFaker().Generate());
    RuleFor(pp => pp.Calculation, new CalculationFaker().Generate());
  }
}

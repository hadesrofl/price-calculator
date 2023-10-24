using FluentAssertions;
using PriceCalculator.Calculation.API.ProductPricing.Records;

namespace PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing.Shared;

public static class AssertEqualityOfProductPricings
{
  public static void Assert(ProductPricingRecord result,
    ProductPricingRecord productPricingRecord)
  {
    result.Id.Should().Be(productPricingRecord.Id);
    result.Product.Should().NotBeNull();
    result.Product?.Name.Should().Be(productPricingRecord.Product?.Name);
    result.Calculation.Should().NotBeNull();
    result.Calculation?.Costs.Count.Should().Be(productPricingRecord.Calculation?.Costs.Count);
  }
}

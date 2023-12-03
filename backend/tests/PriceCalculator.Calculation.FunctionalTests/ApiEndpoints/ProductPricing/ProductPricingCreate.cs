using FluentAssertions;
using PriceCalculator.Calculation.API;
using PriceCalculator.Calculation.API.ProductPricing.Create;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing.Shared;
using Xunit;

namespace PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing;

public class ProductPricingCreate : IClassFixture<CustomWebApplicationFactory<Program>>
{
  private readonly HttpClient _client;

  public ProductPricingCreate(CustomWebApplicationFactory<Program> factory)
  {
    _client = factory.CreateClient();
  }

  [Fact]
  public async Task ShouldCreateProductPricing()
  {
    var request = new CreateProductPricingRequest
    {
      ProductPricing = new ProductPricingRecord
      {
        Product = new ProductRecord { Name = "MacBook Pro", Category = "Laptops" },
        Calculation = new CalculationRecord
        {
          SalesVolume = 250,
          PricePerUnit = new decimal(125.75),
          Currency = "EUR",
          Costs = new List<CostRecord>
          {
            new("Material", CostType.VariableCost, new decimal(12.8)),
            new("Distributing Discount", CostType.Discount, 35)
          }
        }
      }
    };
    var productPricing = await CreateAndSendProductPricing.SendCreateAndReturnResponse(_client, request);

    productPricing?.Product?.Name.Should().Be(request.ProductPricing.Product.Name);
    productPricing?.Product?.Category.Should().Be(request.ProductPricing.Product.Category);

    productPricing?.Calculation?.Currency.Should().Be(request.ProductPricing.Calculation.Currency);
    productPricing?.Calculation?.SalesVolume.Should().Be(request.ProductPricing.Calculation.SalesVolume);
    productPricing?.Calculation?.PricePerUnit.Should().Be(request.ProductPricing.Calculation.PricePerUnit);
    productPricing?.Calculation?.CostPerformanceCalculation.Should().NotBeNull();
  }
}

using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Price_Calculator.Backend.Web;
using Price_Calculator.Backend.Web.ProductPricing.Create;
using Price_Calculator.Backend.Web.ProductPricing.Records;
using Xunit;

namespace Price_Calculator.Backend.FunctionalTests.ApiEndpoints.ProductPricing;

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
    var result = await _client.PostAsJsonAsync(CreateProductPricingRequest.Route, request);
    var response = await result.Content.ReadFromJsonAsync<CreateProductPricingResponse>();
    response.Should().NotBeNull();
    var productPricing = response?.ProductPricing;

    result.Should().NotBeNull();
    result.StatusCode.Should().Be(HttpStatusCode.Created);
    productPricing.Should().NotBeNull();
    productPricing?.Product.Should().NotBeNull();
    productPricing?.Calculation.Should().NotBeNull();

    productPricing?.Product?.Name.Should().Be(request.ProductPricing.Product.Name);
    productPricing?.Product?.Category.Should().Be(request.ProductPricing.Product.Category);

    productPricing?.Calculation?.Currency.Should().Be(request.ProductPricing.Calculation.Currency);
    productPricing?.Calculation?.SalesVolume.Should().Be(request.ProductPricing.Calculation.SalesVolume);
    productPricing?.Calculation?.PricePerUnit.Should().Be(request.ProductPricing.Calculation.PricePerUnit);
    productPricing?.Calculation?.CostPerformanceCalculation.Should().NotBeNull();
  }
}

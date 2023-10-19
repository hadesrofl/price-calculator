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
    var productPricing = await SendCreateAndReturnResponse(_client, request);

    productPricing?.Product?.Name.Should().Be(request.ProductPricing.Product.Name);
    productPricing?.Product?.Category.Should().Be(request.ProductPricing.Product.Category);

    productPricing?.Calculation?.Currency.Should().Be(request.ProductPricing.Calculation.Currency);
    productPricing?.Calculation?.SalesVolume.Should().Be(request.ProductPricing.Calculation.SalesVolume);
    productPricing?.Calculation?.PricePerUnit.Should().Be(request.ProductPricing.Calculation.PricePerUnit);
    productPricing?.Calculation?.CostPerformanceCalculation.Should().NotBeNull();
  }

  public static async Task<ProductPricingRecord?> SendCreateAndReturnResponse(HttpClient client, CreateProductPricingRequest request)
  {
    var result = await client.PostAsJsonAsync(CreateProductPricingRequest.Route, request);
    result.Should().NotBeNull();
    result.StatusCode.Should().Be(HttpStatusCode.Created);
    var response = await result.Content.ReadFromJsonAsync<CreateProductPricingResponse>();
    response.Should().NotBeNull();
    response?.ProductPricing.Should().NotBeNull();
    response?.ProductPricing.Product.Should().NotBeNull();
    response?.ProductPricing.Calculation.Should().NotBeNull();
    return response?.ProductPricing;
  }
}

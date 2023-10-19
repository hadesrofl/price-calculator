using Ardalis.HttpClientTestExtensions;
using AutoMapper;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Price_Calculator.Backend.FunctionalTests.Faker;
using Price_Calculator.Backend.UseCases.ProductPricing;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;
using Price_Calculator.Backend.Web;
using Price_Calculator.Backend.Web.ProductPricing;
using Price_Calculator.Backend.Web.ProductPricing.Create;
using Price_Calculator.Backend.Web.ProductPricing.Get;
using Price_Calculator.Backend.Web.ProductPricing.Records;
using Xunit;

namespace Price_Calculator.Backend.FunctionalTests.ApiEndpoints.ProductPricing;

public class ProductPricingGetById: IClassFixture<CustomWebApplicationFactory<Program>>
{
  private readonly HttpClient _client;
  private readonly IMapper _mapper;

  public ProductPricingGetById(CustomWebApplicationFactory<Program> factory)
  {
    _client = factory.CreateClient();
    _mapper = factory.Services.GetRequiredService<IMapper>();
  }
  
  [Fact]
  public async Task ShouldReturnProductPricing()
  {
    var productPricing = new ProductPricingFaker().Generate();
    var request = new CreateProductPricingRequest { ProductPricing = _mapper.Map<ProductPricingRecord>(_mapper.Map<ProductPricingDto>(productPricing)) };
    var productPricingRecord = await ProductPricingCreate.SendCreateAndReturnResponse(_client, request);
    
    if (productPricingRecord == null) Assert.Fail();
    productPricingRecord.Id.Should().BeGreaterThan(0);
    
    var result =
      await _client.GetAndDeserializeAsync<ProductPricingRecord>(
        GetProductPricingByIdRequest.BuildRoute(productPricingRecord.Id));

    result.Should().NotBeNull();
    result.Id.Should().Be(productPricingRecord.Id);
    result.Product.Should().NotBeNull();
    result.Product?.Name.Should().Be(productPricingRecord.Product?.Name);
    result.Calculation.Should().NotBeNull();
    result.Calculation?.Costs.Count.Should().Be(productPricingRecord.Calculation?.Costs.Count);
  }

  [Fact]
  public async Task ShouldReturnNotFound()
  {
    _ = await _client.GetAndEnsureNotFoundAsync(GetProductPricingByIdRequest.BuildRoute(1000));
  }
}

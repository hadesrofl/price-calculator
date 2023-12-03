using Ardalis.HttpClientTestExtensions;
using AutoMapper;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using PriceCalculator.Calculation.API;
using PriceCalculator.Calculation.API.ProductPricing.List;
using PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing.Shared;
using Xunit;

namespace PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing;

public class ProductPricingList : IClassFixture<CustomWebApplicationFactory<Program>>
{
  private readonly HttpClient _client;
  private readonly IMapper _mapper;

  public ProductPricingList(CustomWebApplicationFactory<Program> factory)
  {
    _client = factory.CreateClient();
    _mapper = factory.Services.GetRequiredService<IMapper>();
  }

  [Fact]
  public async Task ShouldListProductPricings()
  {
    const int NumberToGenerate = 10;
    var productPricings = await CreateAndSendProductPricing.SendCreateAndReturnResponse(_client, _mapper, NumberToGenerate);
    productPricings.Should().NotBeNull().And.NotBeEmpty();
    productPricings.Count.Should().Be(NumberToGenerate);

    var result = await _client.GetAndDeserializeAsync<ListProductPricingsResponse>(ListProductPricings.Route);
    result.Should().NotBeNull();
    var productPricingRecords = result.ProductPricings;
    productPricingRecords.Count.Should().Be(productPricings.Count);
    for (var i = 0; i < productPricingRecords.Count; i++)
    {
      var responseRecord = productPricingRecords[i];
      var requestRecord = productPricings[i];
      AssertEqualityOfProductPricings.Assert(responseRecord, requestRecord);
    }
  }
}

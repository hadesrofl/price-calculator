﻿using Ardalis.HttpClientTestExtensions;
using AutoMapper;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using PriceCalculator.Calculation.API;
using PriceCalculator.Calculation.API.ProductPricing.Create;
using PriceCalculator.Calculation.API.ProductPricing.Get;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing.Shared;
using PriceCalculator.Calculation.FunctionalTests.Faker;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;
using Xunit;

namespace PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing;

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
    var productPricingRecord = await CreateAndSendProductPricing.SendCreateAndReturnResponse(_client, request);
    
    if (productPricingRecord == null) Assert.Fail();
    productPricingRecord.Id.Should().BeGreaterThan(0);
    
    var result =
      await _client.GetAndDeserializeAsync<ProductPricingRecord>(
        GetProductPricingByIdRequest.BuildRoute(productPricingRecord.Id));

    result.Should().NotBeNull();
    AssertEqualityOfProductPricings.Assert(result, productPricingRecord);
  }

  [Fact]
  public async Task ShouldReturnNotFound()
  {
    _ = await _client.GetAndEnsureNotFoundAsync(GetProductPricingByIdRequest.BuildRoute(1000));
  }
}
using System.Net;
using System.Net.Http.Json;
using AutoMapper;
using FluentAssertions;
using Price_Calculator.Backend.FunctionalTests.Faker;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;
using Price_Calculator.Backend.Web.ProductPricing.Create;
using Price_Calculator.Backend.Web.ProductPricing.Records;

namespace Price_Calculator.Backend.FunctionalTests.ApiEndpoints.ProductPricing;

public static class CreateAndSendProductPricing
{
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
  
  public static async Task<List<ProductPricingRecord>> SendCreateAndReturnResponse(HttpClient client, IMapper mapper, int numberToGenerate)
  {
    var productPricings = new ProductPricingFaker().Generate(numberToGenerate);
    var productPricingsRecords = new List<ProductPricingRecord>();
    foreach (var productPricing in productPricings)
    {
      var record = await CreateAndSendProductPricing.SendCreateAndReturnResponse(client,
        new CreateProductPricingRequest
        {
          ProductPricing = mapper
            .Map<ProductPricingRecord>(mapper
              .Map<ProductPricingDto>(productPricing))
        });
      
      if (record != null) productPricingsRecords.Add(record);
    }

    return productPricingsRecords;
  }
}

using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using PriceCalculator.Calculation.API.ProductPricing.Create;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.API.ProductPricing.Update;

namespace PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing.Shared;

public static class UpdateAndSendProductPricing
{
    public static async Task<ProductPricingRecord?> SendUpdateAndReturnResponse(HttpClient client, UpdateProductPricingRequest request)
    {
        var result = await client.PutAsJsonAsync(UpdateProductPricingRequest.BuildRoute(request.ProductPricingId), request);
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(HttpStatusCode.OK);
        var response = await result.Content.ReadFromJsonAsync<UpdateProductPricingResponse>();
        response.Should().NotBeNull();
        response?.ProductPricing.Should().NotBeNull();
        response?.ProductPricing.Product.Should().NotBeNull();
        response?.ProductPricing.Calculation.Should().NotBeNull();
        return response?.ProductPricing;
    }
}
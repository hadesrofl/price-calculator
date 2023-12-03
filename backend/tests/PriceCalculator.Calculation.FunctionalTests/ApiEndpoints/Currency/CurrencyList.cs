using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using ISO._4217;
using PriceCalculator.Calculation.API;
using PriceCalculator.Calculation.API.Currencies.List;
using Xunit;

namespace PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.Currency;

public class CurrencyList : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public CurrencyList(CustomWebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task ShouldListProductPricings()
    {
        // arrange

        // act
        var result = await _client.GetAsync(ListCurrencies.Route);
        result.Should().NotBeNull();
        result.StatusCode.Should().Be(HttpStatusCode.OK);
        var response = await result.Content.ReadFromJsonAsync<ListCurrenciesResponse>();

        // assert

        response.Should().NotBeNull();
        response?.Currencies.Should().NotBeNull().And.NotBeEmpty();
        response?.Currencies.Should().BeEquivalentTo(CurrencyCodesResolver.Codes);
    }
}

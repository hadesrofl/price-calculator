using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using FluentAssertions.Execution;
using Microsoft.AspNetCore.Http;
using PriceCalculator.Calculation.API;
using PriceCalculator.Calculation.API.ProductPricing.Create;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.API.ProductPricing.Update;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing.Shared;
using Xunit;

namespace PriceCalculator.Calculation.FunctionalTests.ApiEndpoints.ProductPricing;

public class ProductPricingUpdate : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ProductPricingUpdate(CustomWebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task ShouldUpdateProductPricing()
    {
        // arrange
        var createdProductPricing = await PostProductPricing();
        var request = new UpdateProductPricingRequest
        {
            ProductPricingId = createdProductPricing.Id,
            ProductPricing = UpdateProductPricingData("MacBook Air", "Laptops/Apple")
        };

        // act
        var productPricing = await UpdateAndSendProductPricing.SendUpdateAndReturnResponse(_client, request);

        // assert
        productPricing?.Product?.Name.Should().Be(request.ProductPricing.Product?.Name).And.NotBe(createdProductPricing.Product?.Name);
        productPricing?.Product?.Category.Should().Be(request.ProductPricing.Product?.Category).And.NotBe(createdProductPricing.Product?.Category);

        productPricing?.Calculation?.Currency.Should().Be(request.ProductPricing.Calculation?.Currency);
        productPricing?.Calculation?.SalesVolume.Should().Be(request.ProductPricing.Calculation?.SalesVolume);
        productPricing?.Calculation?.PricePerUnit.Should().Be(request.ProductPricing.Calculation?.PricePerUnit);
        productPricing?.Calculation?.CostPerformanceCalculation.Should().NotBeNull();
        productPricing?.Calculation?.Costs.Count.Should().Be(request.ProductPricing.Calculation?.Costs.Count).And.NotBe(createdProductPricing.Calculation?.Costs.Count);

        Func<CostRecord, bool> notDiscountPredicate = c => c.Type != CostType.Discount;
        productPricing?.Calculation?.Costs.Where(notDiscountPredicate).ToList().Should().BeEquivalentTo(request.ProductPricing.Calculation?.Costs.Where(notDiscountPredicate).ToList()).And.NotBeEquivalentTo(createdProductPricing.Calculation?.Costs.Where(notDiscountPredicate).ToList());
        Func<CostRecord, bool> discountPredicate = c => c.Type == CostType.Discount;
        var requestDiscountsUpdated = ApplyDiscounts(request.ProductPricing.Calculation?.PricePerUnit ?? 0, request.ProductPricing.Calculation?.Costs.Where(discountPredicate) ?? new List<CostRecord>());
        productPricing?.Calculation?.Costs.Where(discountPredicate).Should().BeEquivalentTo(requestDiscountsUpdated);
    }

    [Fact]
    public async Task ShouldReturnNotFound()
    {
        var response = await _client.PutAsJsonAsync(UpdateProductPricingRequest.BuildRoute(42), new UpdateProductPricingRequest() { ProductPricing = CreateProductPricingData("Hyundai i10", "Cars") });
        response.Should().NotBeNull();
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task ShouldReturnBadRequest()
    {
        var response = await _client.PutAsJsonAsync(UpdateProductPricingRequest.BuildRoute(0), new UpdateProductPricingRequest() { ProductPricingId = 0 });
        response.Should().NotBeNull();
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    private IEnumerable<CostRecord> ApplyDiscounts(decimal pricePerUnit, IEnumerable<CostRecord> costs)
    {
        return costs.Select(cost => cost with { Amount = pricePerUnit * cost.Amount / 100 });
    }

    private async Task<ProductPricingRecord> PostProductPricing()
    {
        var request = new CreateProductPricingRequest
        {
            ProductPricing = CreateProductPricingData("MacBook Pro", "Laptops")
        };

        var productPricing = await CreateAndSendProductPricing.SendCreateAndReturnResponse(_client, request);

        request.ProductPricing.Should().NotBeNull();
        request.ProductPricing.Product.Should().NotBeNull();
        request.ProductPricing.Calculation.Should().NotBeNull();

        productPricing?.Product?.Name.Should().Be(request.ProductPricing.Product?.Name);
        productPricing?.Product?.Category.Should().Be(request.ProductPricing.Product?.Category);

        productPricing?.Calculation?.Currency.Should().Be(request.ProductPricing.Calculation?.Currency);
        productPricing?.Calculation?.SalesVolume.Should().Be(request.ProductPricing.Calculation?.SalesVolume);
        productPricing?.Calculation?.PricePerUnit.Should().Be(request.ProductPricing.Calculation?.PricePerUnit);
        productPricing?.Calculation?.CostPerformanceCalculation.Should().NotBeNull();
        if (productPricing == null) throw new AssertionFailedException("Something went wrong");
        return productPricing;
    }

    private ProductPricingRecord CreateProductPricingData(string productName, string productCategory)
    {
        return new ProductPricingRecord
        {
            Product = new ProductRecord { Name = productName, Category = productCategory },
            Calculation = new CalculationRecord
            {
                SalesVolume = 250,
                PricePerUnit = new decimal(125.75),
                Currency = "EUR",
                Costs = new List<CostRecord>
                {
                    new("Material", CostType.VariableCost, new decimal(12.8)),
                    new("Distributing Discount", CostType.Discount, new decimal(35))
                }
            }
        };
    }

    private ProductPricingRecord UpdateProductPricingData(string productName, string productCategory)
    {
        var productPricing = CreateProductPricingData(productName, productCategory);
        productPricing.Calculation?.Costs.Add(new CostRecord("Shipping", CostType.VariableCost, new decimal(15.89)));
        return productPricing;
    }
}



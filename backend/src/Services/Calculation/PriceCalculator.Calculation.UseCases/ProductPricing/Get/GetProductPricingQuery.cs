using Ardalis.Result;
using Ardalis.SharedKernel;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Get;

public record GetProductPricingQuery(int ProductPricingId) : IQuery<Result<ProductPricingDto>>;

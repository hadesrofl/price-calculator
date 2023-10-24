using Ardalis.Result;
using Ardalis.SharedKernel;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.List;

public record ListProductPricingsQuery : IQuery<Result<IEnumerable<ProductPricingDto>>>;

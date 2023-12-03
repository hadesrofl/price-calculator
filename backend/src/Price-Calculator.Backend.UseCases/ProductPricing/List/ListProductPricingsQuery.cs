using Ardalis.Result;
using Ardalis.SharedKernel;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.List;

public record ListProductPricingsQuery : IQuery<Result<IEnumerable<ProductPricingDto>>>;

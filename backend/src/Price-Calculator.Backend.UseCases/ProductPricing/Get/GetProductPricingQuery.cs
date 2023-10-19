using Ardalis.Result;
using Ardalis.SharedKernel;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.Get;

public record GetProductPricingQuery(int ProductPricingId) : IQuery<Result<ProductPricingDto>>;

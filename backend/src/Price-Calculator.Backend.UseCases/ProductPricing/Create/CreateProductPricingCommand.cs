using Ardalis.Result;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.Create;

public record CreateProductPricingCommand(ProductPricingDto ProductPricing) : Ardalis.SharedKernel.ICommand<Result<ProductPricingDto>>;

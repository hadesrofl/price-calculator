using Ardalis.Result;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Create;

public record CreateProductPricingCommand(ProductPricingDto ProductPricing) : Ardalis.SharedKernel.ICommand<Result<ProductPricingDto>>;

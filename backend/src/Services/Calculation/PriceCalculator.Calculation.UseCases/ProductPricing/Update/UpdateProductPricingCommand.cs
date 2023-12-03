using Ardalis.Result;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Update;

public record UpdateProductPricingCommand(ProductPricingDto ProductPricing) : Ardalis.SharedKernel.ICommand<Result<ProductPricingDto>>;

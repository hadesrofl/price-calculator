using FastEndpoints;
using FluentValidation;
using PriceCalculator.Calculation.API.ProductPricing.Create;
using PriceCalculator.Calculation.API.ProductPricing.Shared.Validators;

namespace PriceCalculator.Calculation.API.Contributors;

public class CreateProductPricingValidator : Validator<CreateProductPricingRequest>
{
    public CreateProductPricingValidator()
    {
        RuleFor(x => x.ProductPricing)
            .NotNull()
            .WithMessage("Product Pricing has to be defined");

        RuleFor(x => x.ProductPricing.Product).SetValidator(new ProductValidator());
        RuleFor(x => x.ProductPricing.Calculation).SetValidator(new CalculationValidator());
    }
}

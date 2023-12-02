using FastEndpoints;
using FluentValidation;
using PriceCalculator.Calculation.API.ProductPricing.Shared.Validators;
using PriceCalculator.Calculation.API.ProductPricing.Update;

namespace PriceCalculator.Calculation.API.Contributors;

public class UpdateProductPricingValidator : Validator<UpdateProductPricingRequest>
{
    public UpdateProductPricingValidator()
    {
        RuleFor(x => x.ProductPricingId)
            .NotNull()
            .GreaterThan(0)
            .WithMessage("Id of Product Pricing has to be greater than 0");

        RuleFor(x => x.ProductPricing)
            .NotNull()
            .WithMessage("Product Pricing has to be defined");

        RuleFor(x => x.ProductPricing.Id)
            .Must((args, productPricingId) => args.ProductPricingId == productPricingId);
        RuleFor(x => x.ProductPricing.Product).SetValidator(new ProductValidator());
        RuleFor(x => x.ProductPricing.Calculation).SetValidator(new CalculationValidator());
    }
}

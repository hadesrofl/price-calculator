using FluentValidation;
using PriceCalculator.Calculation.API.ProductPricing.Records;

namespace PriceCalculator.Calculation.API.ProductPricing.Shared.Validators;

public class ProductValidator : AbstractValidator<ProductRecord>
{
    public ProductValidator()
    {
        RuleFor(x => x).NotNull().WithMessage("Product can't be null");
        RuleFor(x => x.Name).NotNull().NotEmpty().WithMessage("Name can't be empty");
        RuleFor(x => x.Category).NotNull().NotEmpty().WithMessage("Category can't be empty");
    }
}

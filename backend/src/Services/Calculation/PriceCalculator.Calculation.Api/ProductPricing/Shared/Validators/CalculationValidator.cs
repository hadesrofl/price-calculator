using FluentValidation;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.Validators;

namespace PriceCalculator.Calculation.API.ProductPricing.Shared.Validators;

public class CalculationValidator : AbstractValidator<CalculationRecord>
{
    public CalculationValidator()
    {
        RuleFor(x => x).NotNull().WithMessage("Calculation can't be null");
        RuleFor(x => x.SalesVolume).NotNull().NotEmpty().GreaterThan(-1).LessThanOrEqualTo(int.MaxValue).WithMessage($"Sales Volume has to be between 0 and {int.MaxValue}");
        RuleFor(x => x.PricePerUnit).NotNull().NotEmpty().GreaterThan(decimal.MinusOne).LessThanOrEqualTo(decimal.MaxValue).WithMessage($"Price per Unit has to be between 0 and {decimal.MaxValue}");
        RuleFor(x => x.Currency).SetValidator(new CurrencyValidator());
    }
}

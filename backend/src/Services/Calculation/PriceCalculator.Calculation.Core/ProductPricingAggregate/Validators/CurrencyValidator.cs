using FluentValidation;
using ISO._4217;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.Validators;

public class CurrencyValidator : AbstractValidator<string>
{
    public CurrencyValidator()
    {
        RuleFor(x => x)
        .NotNull()
        .Must(currency => CurrencyCodesResolver.GetCurrenciesByCode(currency).Any())
        .WithMessage("Currency must be an ISO 4217 code like \"EUR\"");
    }
}

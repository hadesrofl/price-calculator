using FluentValidation;
using ISO._4217;

namespace PriceCalculator.Calculation.API.ProductPricing.Shared.Validators;

public class CurrencyValidator : AbstractValidator<string>
{
    public CurrencyValidator()
    {
        RuleFor(x => x).NotNull().NotEmpty().Must(currency => CurrencyCodesResolver.GetCurrenciesByCode(currency).Any()).WithMessage("Currency must be an ISO 4217 code like \"EUR\"");
    }
}

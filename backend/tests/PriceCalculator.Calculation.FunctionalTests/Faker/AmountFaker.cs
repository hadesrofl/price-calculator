using Bogus;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.FunctionalTests.Faker;

public class AmountFaker : Faker<Amount>
{
  public AmountFaker()
  {
    RuleFor(a => a.Value, f => f.Finance.Amount());
    RuleFor(a => a.Currency, new CurrencyFaker().Generate());
  }
}

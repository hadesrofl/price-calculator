using Bogus;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.FunctionalTests.Faker;

public class CurrencyFaker : Faker<Currency>
{
  public CurrencyFaker()
  {
    RuleFor(c => c.Name, f => f.Finance.Currency().Code);
  }
}

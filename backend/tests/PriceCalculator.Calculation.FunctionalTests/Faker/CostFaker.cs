using Bogus;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.FunctionalTests.Faker;

public class CostFaker : Faker<Cost>
{
  public CostFaker()
  {
    var randomizer = new Randomizer();
    var costType = (CostType)randomizer.Int((int)CostType.FixedCost, (int)CostType.Discount);
    var costName = costType switch
    {
      CostType.FixedCost => new Bogus.Faker().Commerce.Department(),
      CostType.VariableCost => new Bogus.Faker().Commerce.ProductMaterial(),
      CostType.Discount => new Bogus.Faker().Company.CompanyName(),
      _ => throw new ArgumentOutOfRangeException()
    };

    RuleFor(c => c.Name, f => costName);
    RuleFor(c => c.Type, costType);
    RuleFor(c => c.Discount, costType == CostType.Discount ? new Discount(randomizer.Decimal(0, 75)) : new Discount(0));
    RuleFor(c => c.Amount,
      costType == CostType.Discount ? new Amount(0, new CurrencyFaker().Generate()) : new AmountFaker().Generate());
  }
}

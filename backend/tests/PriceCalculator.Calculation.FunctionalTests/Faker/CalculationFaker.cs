using Bogus;

namespace PriceCalculator.Calculation.FunctionalTests.Faker;

public class CalculationFaker : Faker<Core.ProductPricingAggregate.CalculationEntity.Calculation>
{
  public CalculationFaker()
  {
    RuleFor(c => c.SalesVolume, f => f.Finance.Random.Int(1));
    FinishWith((_, c) =>
    {
      c.AddCosts(new CostFaker().Generate(new Randomizer().Int(0, 10)));
      c.UpdatePrice(new AmountFaker().Generate());
      var cpc = c.CostPerformanceCalculation;
    });
  }
}

using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.Factory;

public static class CalculationFactory
{
  public static Calculation Create(int salesVolume, Amount amount)
  {
    return new Calculation(salesVolume, amount);
  }

  public static Calculation Create(int salesVolume, Amount amount, IEnumerable<Cost> costs)
  {
    var calculation = Create(salesVolume, amount);
    calculation.AddCosts(costs);
    return calculation;
  }
}

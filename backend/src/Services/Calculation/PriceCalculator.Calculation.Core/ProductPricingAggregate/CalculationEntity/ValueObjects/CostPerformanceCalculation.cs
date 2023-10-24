using Microsoft.EntityFrameworkCore;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

/// <summary>
///   Cost Performance Calculation for a <see cref="Calculation" />.
///   This class represents an evaluation on how pricing will cover costs and what kind of possible revenue or profit is to
///   achieve.
/// </summary>
[Owned]
public class CostPerformanceCalculation
{
  /// <summary>
  ///   Constructor. Private so that it can't be called outside of this class and <see cref="Calculate" /> has to be used.
  /// </summary>
  private CostPerformanceCalculation() { }

  /// <summary>
  ///   The total costs, including all <see cref="CostType.FixedCost" /> and <see cref="CostType.VariableCost" />
  /// </summary>
  public Amount TotalCosts { get; private set; } = null!;

  /// <summary>
  ///   Own Costs are the total costs (fixed and variable) per piece
  /// </summary>
  public Amount OwnCosts { get; private set; } = null!;

  /// <summary>
  ///   Break Even is the necessary number of sold products to cover total costs (fixed and variable)
  /// </summary>
  public Amount BreakEven { get; private set; } = null!;

  /// <summary>
  ///   Calculated from the Sales Volume and Price per Unit subtracted by the Discount per unit.
  /// </summary>
  public Amount Revenue { get; private set; } = null!;

  /// <summary>
  ///   Unit Contribution Margin is calculated from <see cref="Revenue" /> - Variable Costs
  /// </summary>
  public Amount UnitContributionMargin { get; private set; } = null!;

  /// <summary>
  ///   Profit is what is left after subtracting all <see cref="TotalCosts" />
  /// </summary>
  public Amount Profit { get; private set; } = null!;

  /// <summary>
  ///   Calculates the <see cref="CostPerformanceCalculation" /> and returns it.
  /// </summary>
  /// <param name="calculation">Is the calculation to base the performance calculation on</param>
  /// <returns>The completed cost performance calculation based on the given price calculation</returns>
  public static CostPerformanceCalculation Calculate(Calculation calculation)
  {
    var currency = calculation.PricePerUnit.Currency;
    var totalFixCosts = new Amount(CalculateTotalFixCosts(calculation.Costs), currency);
    var totalVariableCostsPerUnit = new Amount(CalculateTotalVariableCostsPerUnit(calculation.Costs), currency);
    var totalDiscountCosts = new Amount(CalculateTotalDiscountCosts(calculation.Costs), currency);
    var totalCosts = new Amount(CalculateTotalCosts(totalFixCosts.Value, totalVariableCostsPerUnit.Value,
      totalDiscountCosts.Value,
      calculation.SalesVolume), currency);
    var revenue =
      new Amount(CalculateRevenue(calculation.SalesVolume, totalDiscountCosts.Value, calculation.PricePerUnit),
        currency);
    var unitContributionMargin =
      new Amount(
        CalculateUnitContributionMargin(revenue.Value, calculation.SalesVolume, totalVariableCostsPerUnit.Value),
        currency);

    return new CostPerformanceCalculation
    {
      TotalCosts = totalCosts,
      OwnCosts = new Amount(CalculateOwnCosts(totalCosts.Value, calculation.SalesVolume), currency),
      BreakEven = new Amount(CalculateBreakEven(totalCosts.Value, calculation.PricePerUnit), currency),
      UnitContributionMargin = unitContributionMargin,
      Revenue = revenue,
      Profit = new Amount(CalculateProfit(revenue.Value, totalCosts.Value), currency)
    };
  }

  private static decimal CalculateTotalFixCosts(IEnumerable<Cost> costs)
  {
    return Convert.ToDecimal(costs.Where(c => c.Type == CostType.FixedCost).Sum(c => c.Amount.Value));
  }

  private static decimal CalculateTotalVariableCostsPerUnit(IEnumerable<Cost> costs)
  {
    return Convert.ToDecimal(costs.Where(c => c.Type == CostType.VariableCost).Sum(c => c.Amount.Value));
  }

  private static decimal CalculateTotalDiscountCosts(IEnumerable<Cost> costs)
  {
    return Convert.ToDecimal(costs.Where(c => c.Type == CostType.Discount).Sum(c => c.Amount.Value));
  }

  private static decimal CalculateTotalCosts(
    decimal totalFixCosts,
    decimal totalVariableCosts,
    decimal totalDiscountCosts,
    int salesVolume)
  {
    return totalFixCosts + ((totalVariableCosts + totalDiscountCosts) * salesVolume);
  }

  private static decimal CalculateRevenue(int salesVolume, decimal totalDiscountsCosts, Amount amount)
  {
    return Convert.ToDecimal(salesVolume * (amount.Value - totalDiscountsCosts));
  }

  private static decimal CalculateUnitContributionMargin(decimal revenue, int salesVolume,
    decimal totalVariableCostsPerUnit)
  {
    return revenue - (totalVariableCostsPerUnit * salesVolume);
  }

  private static decimal CalculateOwnCosts(decimal totalCosts, int salesVolume)
  {
    return salesVolume > 0 ? Convert.ToDecimal(totalCosts / salesVolume) : 0;
  }

  private static decimal CalculateBreakEven(decimal totalCosts, Amount amount)
  {
    return amount.Value > 0 ? totalCosts / amount.Value : 0;
  }

  private static decimal CalculateProfit(decimal revenue, decimal totalFixCosts)
  {
    return revenue - totalFixCosts;
  }
}

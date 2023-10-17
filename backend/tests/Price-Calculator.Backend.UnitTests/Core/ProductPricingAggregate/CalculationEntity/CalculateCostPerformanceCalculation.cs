using FluentAssertions;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.Factory;
using Xunit;

namespace Price;

public class CalculateCostPerformanceCalculation
{
  [Theory]
  [MemberData(nameof(GetCostPerformanceData))]
  public void ShouldDoCostPerformanceCalculation(Calculation calculation, decimal expectedTotalCosts,
    decimal expectedOwnCosts, decimal expectedBreakEven, decimal expectedRevenue,
    decimal expectedUnitContributionMargin, decimal expectedProfit)
  {
    const int FractionDigits = 2;
    var cpc = CostPerformanceCalculation.Calculate(calculation);
    AssertCostPerformanceCalculationIsComplete(cpc);
    AssertCalculationMatchesExpectation(expectedTotalCosts, expectedOwnCosts, expectedBreakEven, expectedRevenue,
      expectedUnitContributionMargin, expectedProfit, cpc, FractionDigits);
  }

  [Theory]
  [MemberData(nameof(GetCostPerformanceData))]
  public void ShouldDoCostPerformanceCalculationWithProperty(Calculation calculation, decimal expectedTotalCosts,
    decimal expectedOwnCosts, decimal expectedBreakEven, decimal expectedRevenue,
    decimal expectedUnitContributionMargin, decimal expectedProfit)
  {
    const int FractionDigits = 2;
    var cpc = calculation.CostPerformanceCalculation;
    AssertCostPerformanceCalculationIsComplete(cpc);
    AssertCalculationMatchesExpectation(expectedTotalCosts, expectedOwnCosts, expectedBreakEven, expectedRevenue,
      expectedUnitContributionMargin, expectedProfit, cpc, FractionDigits);
  }

  public static IEnumerable<object[]> GetCostPerformanceData()
  {
    var euro = new Currency("Euro", "€");
    return new List<object[]>
    {
      new object[]
      {
        CalculationFactory.Create(
          250,
          new Amount(new decimal(128.256), euro),
          new List<Cost>
          {
            new("Licenses", new decimal(20.43), euro, CostType.VariableCost),
            new("Material", new decimal(15.17), euro, CostType.VariableCost),
            new("IT-Services", new decimal(29.17), euro, CostType.FixedCost),
            new("Distribution Discount", 30, euro, CostType.Discount)
          }),
        18548.37, 74.19, 144.62, 22444.80, 13544.80, 3896.43
      }
    };
  }

  private static void AssertCostPerformanceCalculationIsComplete(CostPerformanceCalculation cpc)
  {
    cpc.Should().NotBeNull();
    cpc.TotalCosts.Should().NotBeNull();
    cpc.OwnCosts.Should().NotBeNull();
    cpc.BreakEven.Should().NotBeNull();
    cpc.Revenue.Should().NotBeNull();
    cpc.UnitContributionMargin.Should().NotBeNull();
    cpc.Profit.Should().NotBeNull();
  }

  private static void AssertCalculationMatchesExpectation(decimal expectedTotalCosts, decimal expectedOwnCosts,
    decimal expectedBreakEven, decimal expectedRevenue, decimal expectedUnitContributionMargin, decimal expectedProfit,
    CostPerformanceCalculation cpc, int fractionDigits)
  {
    Math.Round(cpc.TotalCosts.Value, fractionDigits).Should().Be(expectedTotalCosts);
    Math.Round(cpc.OwnCosts.Value, fractionDigits).Should().Be(expectedOwnCosts);
    Math.Round(cpc.BreakEven.Value, fractionDigits).Should().Be(expectedBreakEven);
    Math.Round(cpc.Revenue.Value, fractionDigits).Should().Be(expectedRevenue);
    Math.Round(cpc.UnitContributionMargin.Value, fractionDigits).Should().Be(expectedUnitContributionMargin);
    Math.Round(cpc.Profit.Value, fractionDigits).Should().Be(expectedProfit);
  }
}

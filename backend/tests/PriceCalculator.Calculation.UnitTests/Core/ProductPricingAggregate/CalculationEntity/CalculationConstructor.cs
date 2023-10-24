using FluentAssertions;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.Factory;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Xunit;

namespace PriceCalculator.Calculation.UnitTests.Core.ProductPricingAggregate.CalculationEntity;

public class CalculationConstructor
{
  private static Calculation.Core.ProductPricingAggregate.CalculationEntity.Calculation CreateCalculation(int salesVolume, Amount amount)
  {
    return CalculationFactory.Create(salesVolume, amount);
  }

  private static Calculation.Core.ProductPricingAggregate.CalculationEntity.Calculation CreateCalculation(int salesVolume, Amount amount, IEnumerable<Cost> costs)
  {
    return CalculationFactory.Create(salesVolume, amount, costs);
  }

  [Theory]
  [MemberData(nameof(GetCreateCalculationData))]
  public void ShouldCreateCalculationWithoutCosts(int salesVolume, Amount amount)
  {
    AssertSalesVolumeAndPricePerUnit(salesVolume, amount);
  }

  private static void AssertSalesVolumeAndPricePerUnit(int salesVolume, Amount amount)
  {
    if (salesVolume < 0 || amount.Value < 0)
    {
      var act = () => CreateCalculation(salesVolume, amount);
      act.Should().Throw<ArgumentOutOfRangeException>();
      return;
    }

    var calculation = CreateCalculation(salesVolume, amount);

    calculation.Should().NotBeNull();

    calculation.SalesVolume.Should().Be(salesVolume).And.BePositive();
    calculation.PricePerUnit.Should().NotBeNull();
    calculation.PricePerUnit.Value.Should().Be(amount.Value).And.BePositive();
    calculation.PricePerUnit.Currency.Should().Be(amount.Currency);
    calculation.PricePerUnit.Currency.ToString().Should().Be(amount.Currency.ToString());
  }

  public static IEnumerable<object[]> GetCreateCalculationData()
  {
    return new List<object[]>
    {
      new object[] { 100, new Amount(new decimal(2.37), new Currency("EUR")) },
      new object[] { -100, new Amount(new decimal(2.37), new Currency("EUR")) }
    };
  }

  [Theory]
  [MemberData(nameof(GetCreatedCalculationDataWithCosts))]
  public void ShouldCreateCalculationWithCosts(int salesVolume, Amount amount, List<Cost> costs)
  {
    AssertSalesVolumeAndPricePerUnit(salesVolume, amount);

    if (costs.Any(c => c.Amount.Value < 0))
    {
      var act = () => CreateCalculation(salesVolume, amount, costs);
      act.Should().Throw<ArgumentOutOfRangeException>();
      return;
    }

    var calculation = CreateCalculation(salesVolume, amount, costs);

    calculation.Should().NotBeNull();
    calculation.Costs.Should().NotBeNull().And.NotBeEmpty();
    calculation.Costs.Should().BeEquivalentTo(costs);
  }

  public static IEnumerable<object[]> GetCreatedCalculationDataWithCosts()
  {
    var euroCurrency = new Currency("EUR");
    return new List<object[]>
    {
      new object[]
      {
        100, new Amount(new decimal(2.37), euroCurrency),
        new List<Cost> { new("Salary", 1234, euroCurrency, CostType.FixedCost) }
      },
      new object[]
      {
        100, new Amount(new decimal(2.37), euroCurrency),
        new List<Cost>
        {
          new("Salary", 1234, euroCurrency, CostType.FixedCost),
          new("Storage Room", 5716, euroCurrency, CostType.FixedCost),
          new("Manufacturing per Piece", 125, euroCurrency, CostType.VariableCost)
        }
      }
    };
  }
}

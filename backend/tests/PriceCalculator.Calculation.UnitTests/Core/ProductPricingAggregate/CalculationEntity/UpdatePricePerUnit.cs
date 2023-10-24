using FluentAssertions;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.Factory;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Xunit;

namespace PriceCalculator.Calculation.UnitTests.Core.ProductPricingAggregate.CalculationEntity;

public class UpdatePricePerUnit
{
  [Theory]
  [MemberData(nameof(GetUpdatePriceData))]
  public void ShouldUpdatePriceAndDiscounts(Calculation.Core.ProductPricingAggregate.CalculationEntity.Calculation calculation, Amount newAmount)
  {
    var oldCosts = ReturnNonDiscounts(calculation);
    AssertCalculationAndGetNonDiscountCosts(calculation, newAmount);

    calculation.UpdatePrice(newAmount);
    AssertDiscountsChanged(calculation, newAmount);
    OldCostsShouldStayTheSame(calculation, oldCosts);
  }

  public static IEnumerable<object[]> GetUpdatePriceData()
  {
    var euro = new Currency("EUR");
    return new List<object[]>
    {
      new object[]
      {
        CalculationFactory.Create(
          100,
          new Amount(new decimal(10.15), euro),
          new List<Cost>
          {
            new("Salary", 2345, euro, CostType.FixedCost),
            new("Manufacturing per Piece", new decimal(3.23), euro, CostType.VariableCost),
            new("Distribution Discount", 35, euro, CostType.Discount)
          }),
        new Amount(12, euro)
      }
    };
  }

  private static void OldCostsShouldStayTheSame(Calculation.Core.ProductPricingAggregate.CalculationEntity.Calculation calculation, List<Cost> oldCosts)
  {
    oldCosts.Should().BeEquivalentTo(calculation.Costs.Where(c => c.Type != CostType.Discount));
  }

  private static List<Cost> ReturnNonDiscounts(Calculation.Core.ProductPricingAggregate.CalculationEntity.Calculation calculation)
  {
    calculation.Should().NotBeNull();
    calculation.Costs.Should().NotBeNull().And.NotBeEmpty();
    return calculation.Costs.Where(c => c.Type != CostType.Discount).ToList();
  }

  private static void AssertDiscountsChanged(Calculation.Core.ProductPricingAggregate.CalculationEntity.Calculation calculation, Amount newAmount)
  {
    calculation.Costs.Where(c => c.Type == CostType.Discount)
      .All(d => d.Amount.Value == d.Discount.PercentageValue * newAmount.Value / 100).Should().BeTrue();
  }

  private static void AssertCalculationAndGetNonDiscountCosts(Calculation.Core.ProductPricingAggregate.CalculationEntity.Calculation calculation, Amount newAmount)
  {
    calculation.PricePerUnit.Should().NotBeNull();
    calculation.PricePerUnit.Should().NotBe(newAmount.Value);
    calculation.Costs.Should().NotBeNull().And.NotBeEmpty().And.Contain(c => c.Type == CostType.Discount);
  }
}

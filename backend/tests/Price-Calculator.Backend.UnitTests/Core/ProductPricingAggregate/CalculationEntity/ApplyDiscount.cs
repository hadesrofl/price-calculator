using FluentAssertions;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Xunit;

namespace Price;

public class ApplyDiscount
{
  [Theory]
  [MemberData(nameof(GetApplyDiscountData))]
  public void ShouldApplyDiscount(Cost cost, Amount amount, decimal expectedCost)
  {
    cost.Amount.Should().NotBeNull();
    cost.Amount.Value.Should().Be(0);
    cost.Type.Should().Be(CostType.Discount);
    cost.Amount.Currency.Should().Be(amount.Currency);
    cost.ApplyDiscountAndUpdateValue(amount);
    cost.Amount.Should().NotBeNull();
    cost.Amount.Value.Should().NotBe(0).And.Be(expectedCost);
  }

  public static IEnumerable<object[]> GetApplyDiscountData()
  {
    Currency euro = new("EUR");
    return new List<object[]>
    {
      new object[] { new Cost("Distribution Discount", 45, euro, CostType.Discount), new Amount(8, euro), 3.6 }
    };
  }
}

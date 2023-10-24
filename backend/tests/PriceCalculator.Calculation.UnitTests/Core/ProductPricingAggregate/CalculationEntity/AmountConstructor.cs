using FluentAssertions;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Xunit;

namespace PriceCalculator.Calculation.UnitTests.Core.ProductPricingAggregate.CalculationEntity;

public class AmountConstructor
{
  private static Amount CreateAmount(decimal value, Currency currency)
  {
    return new Amount(value, currency);
  }

  [Theory]
  [MemberData(nameof(GetCreateAmountData))]
  public void ShouldCreateAmount(decimal value, Currency currency)
  {
    var amount = CreateAmount(value, currency);

    amount.Should().NotBeNull();
    amount.Value.Should().Be(value);
    amount.Currency.Should().NotBeNull().And.Be(currency);
    amount.Currency.ToString().Should().BeEquivalentTo(currency.ToString());
  }

  public static IEnumerable<object[]> GetCreateAmountData()
  {
    return new List<object[]>
    {
      new object[] { 2.37, new Currency("EUR") }, new object[] { -2.37, new Currency("EUR") }
    };
  }
}

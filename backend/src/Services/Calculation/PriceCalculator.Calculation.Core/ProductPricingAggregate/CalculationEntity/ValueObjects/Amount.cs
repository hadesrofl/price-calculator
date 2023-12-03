using Microsoft.EntityFrameworkCore;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

/// <summary>
///   Represents a financial amount
/// </summary>
[Owned]
public record Amount
{
  /// <summary>
  ///   Empty constructor for EFCore
  /// </summary>
  public Amount()
  {
    Currency = new Currency();
  }
  
  /// <summary>
  ///   Constructor
  /// </summary>
  /// <param name="Value">Is the price</param>
  /// <param name="Currency">Is the currency of the price</param>
  public Amount(decimal Value, Currency Currency)
  {
    this.Value = Value;
    this.Currency = Currency;
  }

  /// <summary>Is the financial value</summary>
  public decimal Value { get; init; }

  /// <summary>Is the currency of the value</summary>
  public Currency Currency { get; init; }
}

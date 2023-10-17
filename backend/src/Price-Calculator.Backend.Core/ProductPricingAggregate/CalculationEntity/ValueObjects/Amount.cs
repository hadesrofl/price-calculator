namespace Price;

/// <summary>
///   Represents a financial amount
/// </summary>
public record Amount
{
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
  public Currency Currency { get; }
}

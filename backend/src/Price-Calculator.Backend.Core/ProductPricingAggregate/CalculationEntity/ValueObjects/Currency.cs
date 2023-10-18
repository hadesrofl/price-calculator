namespace Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

/// <summary>
///   Represents a currency that is tied to a value
/// </summary>
public record Currency
{
  /// <summary>
  ///   Constructor
  /// </summary>
  /// <param name="name">Is the name of the currency in English</param>
  public Currency(string name)
  {
    Name = name;
  }

  /// <summary>
  ///   Is the name of the currency in English
  /// </summary>
  public string Name { get; } = string.Empty;

  /// <inheritdoc />
  public virtual bool Equals(Currency? other)
  {
    return other != null && Name == other.Name;
  }

  /// <inheritdoc />
  public override int GetHashCode()
  {
    return HashCode.Combine(Name);
  }
}

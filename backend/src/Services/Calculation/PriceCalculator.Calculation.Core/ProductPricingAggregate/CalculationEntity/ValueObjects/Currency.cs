using Microsoft.EntityFrameworkCore;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

/// <summary>
///   Represents a currency that is tied to a value
/// </summary>
[Owned]
public record Currency
{
  /// <summary>
  ///   Empty constructor for EFCore
  /// </summary>
  public Currency()
  {
    
  }
  
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
  public string Name { get; init; } = string.Empty;

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

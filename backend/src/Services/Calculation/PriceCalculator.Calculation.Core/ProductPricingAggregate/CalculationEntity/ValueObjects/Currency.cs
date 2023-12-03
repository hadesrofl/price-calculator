using FluentValidation;
using Microsoft.EntityFrameworkCore;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.Validators;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

/// <summary>
///   Represents a currency that is tied to a value
/// </summary>
[Owned]
public record Currency
{
  private string _name = string.Empty;

  /// <summary>
  ///   Empty constructor for EFCore
  /// </summary>
  public Currency()
  {

  }

  /// <summary>
  ///   Constructor
  /// </summary>
  /// <param name="name">Is the name of the currency as ISO 4217 code</param>
  public Currency(string name)
  {
    Name = name;
  }

  /// <summary>
  ///   Is the name of the currency as ISO 4217 code
  /// </summary>
  public string Name
  {
    get => _name;
    init
    {
      Validate(value);
      _name = value;
    }
  }

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

  private static void Validate(string name) => new CurrencyValidator().ValidateAndThrow(name);
}

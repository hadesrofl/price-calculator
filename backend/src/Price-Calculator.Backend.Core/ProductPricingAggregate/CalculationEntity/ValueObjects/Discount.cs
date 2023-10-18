namespace Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

/// <summary>
/// A percentage based discount applied based on a <see cref="Amount"/>
/// </summary>
/// <param name="PercentageValue">Is the percentage value of the discount which will be applied to a given base value</param>
public record Discount(decimal PercentageValue);

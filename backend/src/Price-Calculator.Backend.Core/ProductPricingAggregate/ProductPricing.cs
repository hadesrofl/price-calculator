using Ardalis.SharedKernel;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity;

namespace Price_Calculator.Backend.Core.ProductPricingAggregate;

/// <summary>
/// Aggregate of a <see cref="Product"/> and its pricing <see cref="Calculation"/>
/// </summary>
public class ProductPricing : EntityBase, IAggregateRoot
{
  /// <summary>
  /// Is the product this pricing relates to
  /// </summary>
  public Product Product { get; }
  
  /// <summary>
  /// Is the price calculation
  /// </summary>
  public Calculation Calculation { get; }

  /// <summary>
  /// Constructor
  /// </summary>
  /// <param name="product">Is the product for this price calculation</param>
  /// <param name="calculation">Is the calculation itself</param>
  public ProductPricing(Product product, Calculation calculation)
  {
    Product = product;
    Calculation = calculation;
  }
}

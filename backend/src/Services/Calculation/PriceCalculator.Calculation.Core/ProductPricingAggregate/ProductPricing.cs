using Ardalis.SharedKernel;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.ProductEntity;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.ProductEntity.ValueObjects;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate;

/// <summary>
/// Aggregate of a <see cref="Product"/> and its pricing <see cref="Calculation"/>
/// </summary>
public class ProductPricing : EntityBase, IAggregateRoot
{
  /// <summary>
  /// Is the product this pricing relates to
  /// </summary>
  public Product Product { get; private set; }
  
  /// <summary>
  /// Is the price calculation
  /// </summary>
  public CalculationEntity.Calculation Calculation { get; private set; }

  public ProductPricing()
  {
    Product = new Product(string.Empty, new ProductCategory());
    Calculation = new CalculationEntity.Calculation(0, new Amount());
  }
  
  /// <summary>
  /// Constructor
  /// </summary>
  /// <param name="product">Is the product for this price calculation</param>
  /// <param name="calculation">Is the calculation itself</param>
  public ProductPricing(Product product, CalculationEntity.Calculation calculation)
  {
    Product = product;
    Calculation = calculation;
  }
}

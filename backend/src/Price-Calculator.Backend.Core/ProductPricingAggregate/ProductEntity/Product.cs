using Ardalis.SharedKernel;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity.ValueObjects;

namespace Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity;

/// <summary>
///   Represents a product
/// </summary>
public class Product : EntityBase
{
  /// <summary>
  ///   Empty constructor for EFCore
  /// </summary>
  public Product()
  {
    Name = string.Empty;
    Category = new ();
  }
  
  /// <summary>
  ///   Constructor
  /// </summary>
  /// <param name="name">Is the name of the product</param>
  /// <param name="category">Is the category this product belongs to</param>
  public Product(string name, ProductCategory category)
  {
    Name = name;
    Category = category;
  }

  /// <summary>
  ///   Is the name of the product
  /// </summary>
  public string Name { get; init; }

  /// <summary>
  ///   Is the category this product belongs to
  /// </summary>
  public ProductCategory Category { get; private set; }
}

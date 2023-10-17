namespace Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity.ValueObjects;

/// <summary>
///   Represents a category for a <see cref="Product" />
/// </summary>
public class ProductCategory
{
  /// <summary>
  ///   Constructor
  /// </summary>
  /// <param name="name">Is the name of the category</param>
  public ProductCategory(string name)
  {
    Name = name;
  }

  /// <summary>
  ///   Is the name of the category
  /// </summary>
  public string Name { get; }
}

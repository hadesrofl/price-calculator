using FluentAssertions;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity.ValueObjects;
using Xunit;

namespace Price_Calculator.Backend.UnitTests.Core.ProductPricingAggregate.ProductEntity;

public class ProductCategoryConstructor
{
  [Theory]
  [MemberData(nameof(GetProductCategoryData))]
  public void ShouldCreateProductCategory(string name)
  {
    var productCategory = new ProductCategory(name);
    productCategory.Should().NotBeNull();
    productCategory.Name.Should().NotBeNullOrEmpty();
  }

  public static IEnumerable<object[]> GetProductCategoryData()
  {
    return new List<object[]> { new object[] { "Video Games" } };
  }
}

﻿using FluentAssertions;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity.ValueObjects;
using Xunit;

namespace Price_Calculator.Backend.UnitTests.Core.ProductPricingAggregate.ProductEntity;

public class ProductConstructor
{
  [Theory]
  [MemberData(nameof(GetProductData))]
  public void ShouldCreateProduct(string name, ProductCategory category)
  {
    var product = new Product(name, category);
    product.Should().NotBeNull();
    product.Name.Should().NotBeNullOrEmpty();
    product.Category.Should().NotBeNull();
  }

  public static IEnumerable<object[]> GetProductData()
  {
    return new List<object[]> { new object[] { "MacBook Pro", new ProductCategory("Notebooks") } };
  }
}
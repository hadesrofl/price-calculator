using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PriceCalculator.Calculation.Core.ProductPricingAggregate;

namespace PriceCalculator.Calculation.Infrastructure.Data.Config;

public class ProductPricingConfiguration : IEntityTypeConfiguration<ProductPricing>
{
  public void Configure(EntityTypeBuilder<ProductPricing> builder)
  {
  }
}

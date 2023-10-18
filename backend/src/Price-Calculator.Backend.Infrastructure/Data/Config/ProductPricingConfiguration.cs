using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Price_Calculator.Backend.Core.ProductPricingAggregate;

namespace Price_Calculator.Backend.Infrastructure.Data.Config;

public class ProductPricingConfiguration : IEntityTypeConfiguration<ProductPricing>
{
  public void Configure(EntityTypeBuilder<ProductPricing> builder)
  {
  }
}

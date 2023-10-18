using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Price_Calculator.Backend.Core.ContributorAggregate;
using Price_Calculator.Backend.Core.ProductPricingAggregate;

namespace Price_Calculator.Backend.Infrastructure.Data.Config;

public class ProductPricingConfiguration : IEntityTypeConfiguration<ProductPricing>
{
  public void Configure(EntityTypeBuilder<ProductPricing> builder)
  {
    builder.Property(p => p.Name)
      .HasMaxLength(DataSchemaConstants.DEFAULT_NAME_LENGTH)
      .IsRequired();

    builder.Property(x => x.Status)
      .HasConversion(
        x => x.Value,
        x => ContributorStatus.FromValue(x));
  }
}

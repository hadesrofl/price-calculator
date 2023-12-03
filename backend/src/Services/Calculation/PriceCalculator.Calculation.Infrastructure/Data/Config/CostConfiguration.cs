using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.Infrastructure.Data.Config;

public class CalculationConfiguration : IEntityTypeConfiguration<Core.ProductPricingAggregate.CalculationEntity.Calculation>
{
  public void Configure(EntityTypeBuilder<Core.ProductPricingAggregate.CalculationEntity.Calculation> builder)
  {
    builder.OwnsMany(calculation => calculation.Costs,
      a =>
      {
        const string OwnerForeignKey = $"{nameof(Core.ProductPricingAggregate.CalculationEntity.Calculation)}Id";
        a.WithOwner().HasForeignKey(OwnerForeignKey);
        a.HasKey(nameof(Cost.Name), OwnerForeignKey);
      });
  }
}

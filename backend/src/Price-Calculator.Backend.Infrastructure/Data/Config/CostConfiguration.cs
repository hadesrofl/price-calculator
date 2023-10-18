using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace Price_Calculator.Backend.Infrastructure.Data.Config;

public class CalculationConfiguration : IEntityTypeConfiguration<Calculation>
{
  public void Configure(EntityTypeBuilder<Calculation> builder)
  {
    builder.OwnsMany(calculation => calculation.Costs,
      a =>
      {
        const string OwnerForeignKey = $"{nameof(Calculation)}Id";
        a.WithOwner().HasForeignKey(OwnerForeignKey);
        a.HasKey(nameof(Cost.Name), OwnerForeignKey);
      });
  }
}

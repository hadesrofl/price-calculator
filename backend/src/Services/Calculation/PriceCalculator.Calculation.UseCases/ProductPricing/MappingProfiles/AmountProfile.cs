using AutoMapper;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.MappingProfiles;

public class AmountProfile : Profile
{
  public AmountProfile()
  {
    CreateMap<Decimal, Amount>()
      .ConstructUsing((dec, _) => new Amount(dec, new Currency(string.Empty)));
    CreateMap<Amount, Decimal>()
      .ConstructUsing((amount, _) => amount.Value);
  }
}

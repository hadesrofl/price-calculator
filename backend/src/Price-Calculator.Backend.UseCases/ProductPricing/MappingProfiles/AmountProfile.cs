using AutoMapper;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace Price_Calculator.Backend.UseCases.ProductPricing.MappingProfiles;

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

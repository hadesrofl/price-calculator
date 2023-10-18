using AutoMapper;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.MappingProfiles;

public class CalculationProfile : Profile
{
  public CalculationProfile()
  {
    CreateMap<Calculation, CalculationDto>()
      .ForMember(c => c.PricePerUnit, opt => opt.MapFrom(src => src.PricePerUnit.Value))
      .ForMember(c => c.Currency, opt => opt.MapFrom(src => src.PricePerUnit.Currency.Name));
    CreateMap<CalculationDto, Calculation>()
      .ForMember(c => c.Costs, opt => opt.Ignore())
      .ForMember(c => c.CostPerformanceCalculation, opt => opt.Ignore())
      .AfterMap((dto, calc, _) =>
      {
        // TODO: Custom Resolver for Currency entries after they are part of the repository,
        // https://docs.automapper.org/en/stable/Custom-value-resolvers.html#custom-value-resolvers
        var currency = new Currency(dto.Currency);
        dto.Costs.ForEach(c => calc.AddCost(c.Name, c.Amount, currency, c.Type));
        calc.UpdatePrice(new Amount(dto.PricePerUnit, currency));
      });
  }
}

using AutoMapper;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.MappingProfiles;

public class CalculationProfile : Profile
{
  public CalculationProfile()
  {
    CreateMap<Core.ProductPricingAggregate.CalculationEntity.Calculation, CalculationDto>()
      .ForMember(c => c.PricePerUnit, opt => opt.MapFrom(src => src.PricePerUnit.Value))
      .ForMember(c => c.Currency, opt => opt.MapFrom(src => src.PricePerUnit.Currency.Name));
    CreateMap<CalculationDto, Core.ProductPricingAggregate.CalculationEntity.Calculation>()
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

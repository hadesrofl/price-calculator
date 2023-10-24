using AutoMapper;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.MappingProfiles;

public class CostProfile : Profile
{
  public CostProfile()
  {
    CreateMap<CostDto, Cost>()
      .ConstructUsing((dto, _) => new Cost(dto.Name, dto.Amount, new Currency(string.Empty), dto.Type));
    CreateMap<Cost, CostDto>()
      .ForMember(c => c.Amount, opt => opt.MapFrom(src => src.Amount.Value));
  }
}

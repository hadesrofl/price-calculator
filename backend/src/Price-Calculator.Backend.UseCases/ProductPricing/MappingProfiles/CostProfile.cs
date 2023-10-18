using AutoMapper;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.MappingProfiles;

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

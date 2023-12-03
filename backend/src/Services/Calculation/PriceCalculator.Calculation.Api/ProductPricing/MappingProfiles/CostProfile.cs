using AutoMapper;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.API.ProductPricing.MappingProfiles;

public class CostProfile : Profile
{
  public CostProfile()
  {
    CreateMap<CostDto, CostRecord>().ReverseMap();
  }
}

using AutoMapper;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.MappingProfiles;

public class CostPerformanceCalculationProfile : Profile
{
  public CostPerformanceCalculationProfile()
  {
    CreateMap<CostPerformanceCalculationDto, CostPerformanceCalculation>().ReverseMap();
  }
}

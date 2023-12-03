using AutoMapper;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.MappingProfiles;

public class CostPerformanceCalculationProfile : Profile
{
  public CostPerformanceCalculationProfile()
  {
    CreateMap<CostPerformanceCalculationDto, CostPerformanceCalculation>().ReverseMap();
  }
}

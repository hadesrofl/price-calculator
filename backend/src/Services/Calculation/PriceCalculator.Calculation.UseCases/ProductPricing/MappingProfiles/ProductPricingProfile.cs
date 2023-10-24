using AutoMapper;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.MappingProfiles;

public class ProductPricingProfile : Profile
{
  public ProductPricingProfile()
  {
    CreateMap<Core.ProductPricingAggregate.ProductPricing, ProductPricingDto>().ReverseMap();
  }
}

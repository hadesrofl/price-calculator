using AutoMapper;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.MappingProfiles;

public class ProductPricingProfile : Profile
{
  public ProductPricingProfile()
  {
    CreateMap<Core.ProductPricingAggregate.ProductPricing, ProductPricingDto>().ReverseMap();
  }
}

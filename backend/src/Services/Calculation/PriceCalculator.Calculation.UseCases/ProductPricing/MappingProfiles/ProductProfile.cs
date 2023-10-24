using AutoMapper;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.ProductEntity;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.MappingProfiles;

public class ProductProfile : Profile
{
  public ProductProfile()
  {
    CreateMap<Product, ProductDto>()
      .ForMember(
        p => p.Category,
        opt =>
          opt.MapFrom(src => src.Category.Name))
      .ReverseMap()
      .ForPath(
        p => p.Category, 
        opt => 
          opt.MapFrom(src => src.Category));
  }
}

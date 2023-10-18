using AutoMapper;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

namespace Price_Calculator.Backend.UseCases.ProductPricing.MappingProfiles;

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

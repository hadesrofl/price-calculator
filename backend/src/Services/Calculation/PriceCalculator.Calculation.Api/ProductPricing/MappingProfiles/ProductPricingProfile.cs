using AutoMapper;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.API.ProductPricing.MappingProfiles;

public class ProductPricingProfile : Profile
{
  public ProductPricingProfile()
  {
    CreateMap<ProductPricingDto, ProductPricingRecord>()
      .ReverseMap();
  }
}

using AutoMapper;
using Price_Calculator.Backend.UseCases.ProductPricing;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;
using Price_Calculator.Backend.Web.ProductPricing.Records;

namespace Price_Calculator.Backend.Web.ProductPricing.MappingProfiles;

public class ProductProfile : Profile
{
  public ProductProfile()
  {
    CreateMap<ProductDto, ProductRecord>().ReverseMap();
  }
}

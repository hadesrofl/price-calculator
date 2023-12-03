using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Price_Calculator.Backend.UseCases.ProductPricing.Dtos;
using Price_Calculator.Backend.UseCases.ProductPricing.List;

namespace Price_Calculator.Backend.Infrastructure.Data.Queries;

public class ListProductPricingsQueryService : IListProductPricingsQueryService
{
  private readonly AppDbContext _dbContext;
  private readonly IMapper _mapper;
  
  public ListProductPricingsQueryService(AppDbContext dbContext, IMapper mapper)
  {
    _dbContext = dbContext;
    _mapper = mapper;
  }
  
  public async Task<IEnumerable<ProductPricingDto>> ListAsync()
  {
    var result = await _dbContext.ProductPricings
      .Include(productPricing => productPricing.Product)
      .ThenInclude(product => product.Category)
      .Include(productPricing => productPricing.Calculation)
      .ThenInclude(calculation => calculation.Costs)
      .ToListAsync();

    return _mapper.Map<List<ProductPricingDto>>(result);
  }
}

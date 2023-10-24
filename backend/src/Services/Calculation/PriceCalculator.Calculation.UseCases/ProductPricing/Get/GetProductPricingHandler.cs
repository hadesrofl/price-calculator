using Ardalis.Result;
using Ardalis.SharedKernel;
using AutoMapper;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.Specifications;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Get;

public class GetProductPricingHandler : IQueryHandler<GetProductPricingQuery, Result<ProductPricingDto>>
{
  private readonly IMapper _mapper;
  private readonly IReadRepository<Core.ProductPricingAggregate.ProductPricing> _repository;

  public GetProductPricingHandler(IReadRepository<Core.ProductPricingAggregate.ProductPricing> repository,
    IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  public async Task<Result<ProductPricingDto>> Handle(GetProductPricingQuery request,
    CancellationToken cancellationToken)
  {
    var spec = new ProductPricingByIdSpec(request.ProductPricingId);
    var entity = await _repository.FirstOrDefaultAsync(spec, cancellationToken);
    if (entity == null)
    {
      return Result.NotFound();
    }

    return _mapper.Map<ProductPricingDto>(entity);
  }
}

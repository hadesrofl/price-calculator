using Ardalis.Result;
using Ardalis.SharedKernel;
using AutoMapper;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Create;

public class CreateProductPricingHandler : ICommandHandler<CreateProductPricingCommand, Result<ProductPricingDto>>
{
  private readonly IRepository<Core.ProductPricingAggregate.ProductPricing> _repository;
  private readonly IMapper _mapper;

  public CreateProductPricingHandler(IRepository<Core.ProductPricingAggregate.ProductPricing> repository, IMapper mapper)
  {
    _repository = repository;
    _mapper = mapper;
  }

  public async Task<Result<ProductPricingDto>> Handle(CreateProductPricingCommand request,
    CancellationToken cancellationToken)
  {
    var newProductPricing = _mapper.Map<Core.ProductPricingAggregate.ProductPricing>(request.ProductPricing);
    var createdItem = await _repository.AddAsync(newProductPricing, cancellationToken);
    return _mapper.Map<ProductPricingDto>(createdItem);
  }
}

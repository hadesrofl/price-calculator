using Ardalis.Result;
using Ardalis.SharedKernel;
using AutoMapper;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Update;

public class UpdateProductPricingHandler : ICommandHandler<UpdateProductPricingCommand, Result<ProductPricingDto>>
{
    private readonly IRepository<Core.ProductPricingAggregate.ProductPricing> _repository;
    private readonly IMapper _mapper;

    public UpdateProductPricingHandler(IRepository<Core.ProductPricingAggregate.ProductPricing> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<Result<ProductPricingDto>> Handle(UpdateProductPricingCommand request,
      CancellationToken cancellationToken)
    {
        var requestProductPricing = _mapper.Map<Core.ProductPricingAggregate.ProductPricing>(request.ProductPricing);
        var foundProductPricing = await _repository.GetByIdAsync(requestProductPricing.Id);
        if (foundProductPricing == null) return Result.NotFound();
        foundProductPricing.Update(requestProductPricing);
        await _repository.UpdateAsync(foundProductPricing, cancellationToken);
        return Result.Success(_mapper.Map<ProductPricingDto>(requestProductPricing));
    }
}

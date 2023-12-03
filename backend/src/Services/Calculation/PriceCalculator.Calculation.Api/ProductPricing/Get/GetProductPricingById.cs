using Ardalis.Result;
using FastEndpoints;
using MediatR;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.UseCases.ProductPricing.Get;
using IMapper = AutoMapper.IMapper;

namespace PriceCalculator.Calculation.API.ProductPricing.Get;

public class GetProductPricingById : Endpoint<GetProductPricingByIdRequest, ProductPricingRecord>
{
  private readonly IMapper _mapper;
  private readonly IMediator _mediator;

  public GetProductPricingById(IMediator mediator, IMapper mapper)
  {
    _mediator = mediator;
    _mapper = mapper;
  }

  public override void Configure()
  {
    Get(GetProductPricingByIdRequest.Route);
    AllowAnonymous();
  }

  public override async Task HandleAsync(GetProductPricingByIdRequest request,
    CancellationToken cancellationToken)
  {
    var command = new GetProductPricingQuery(request.ProductPricingId);

    var result = await _mediator.Send(command, cancellationToken);

    if (result.Status == ResultStatus.NotFound)
    {
      await SendNotFoundAsync(cancellationToken);
      return;
    }

    if (result.IsSuccess)
    {
      Response = _mapper.Map<ProductPricingRecord>(result.Value);
    }
  }
}

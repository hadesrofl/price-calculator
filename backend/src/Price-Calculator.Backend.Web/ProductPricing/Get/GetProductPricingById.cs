using Ardalis.Result;
using FastEndpoints;
using MediatR;
using Price_Calculator.Backend.UseCases.ProductPricing.Get;
using Price_Calculator.Backend.Web.ProductPricing.Records;
using IMapper = AutoMapper.IMapper;

namespace Price_Calculator.Backend.Web.ProductPricing.Get;

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

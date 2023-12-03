using FastEndpoints;
using MediatR;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.UseCases.ProductPricing.List;
using IMapper = AutoMapper.IMapper;

namespace PriceCalculator.Calculation.API.ProductPricing.List;

public class ListProductPricings : EndpointWithoutRequest<ListProductPricingsResponse>
{
  public static string Route => "/ProductPricing";
  private readonly IMapper _mapper;
  private readonly IMediator _mediator;

  public ListProductPricings(IMediator mediator, IMapper mapper)
  {
    _mediator = mediator;
    _mapper = mapper;
  }

  public override void Configure()
  {
    Get(Route);
    AllowAnonymous();
  }

  public override async Task HandleAsync(CancellationToken cancellationToken)
  {
    var result = await _mediator.Send(new ListProductPricingsQuery(), cancellationToken);

    if (result.IsSuccess)
    {
      Response = new(_mapper.Map<List<ProductPricingRecord>>(result.Value));
    }
    else
    {
      await SendAsync(new(new()), StatusCodes.Status500InternalServerError, cancellationToken);
    }
  }
}

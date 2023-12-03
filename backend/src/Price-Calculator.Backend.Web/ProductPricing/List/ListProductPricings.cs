using FastEndpoints;
using MediatR;
using Price_Calculator.Backend.UseCases.ProductPricing.List;
using Price_Calculator.Backend.Web.ProductPricing.Records;
using IMapper = AutoMapper.IMapper;

namespace Price_Calculator.Backend.Web.ProductPricing.List;

public class ListProductPricings : EndpointWithoutRequest<ListProductPricingsResponse>
{
  public static string Route => "/ProductPricings";
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
      Response = new(new());
    }
  }
}

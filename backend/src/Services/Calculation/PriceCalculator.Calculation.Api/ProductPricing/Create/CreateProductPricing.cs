using FastEndpoints;
using MediatR;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.UseCases.ProductPricing.Create;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;
using IMapper = AutoMapper.IMapper;

namespace PriceCalculator.Calculation.API.ProductPricing.Create;

public class CreateProductPricing : Endpoint<CreateProductPricingRequest, CreateProductPricingResponse>
{
  private readonly IMediator _mediator;
  private readonly IMapper _mapper;

  public CreateProductPricing(IMediator mediator, IMapper mapper)
  {
    _mediator = mediator;
    _mapper = mapper;
  }

  public override void Configure()
  {
    Post(CreateProductPricingRequest.Route);
    AllowAnonymous();
    Summary(s =>
    {
      // XML Docs are used by default but are overridden by these properties:
      //s.Summary = "Create a new Contributor.";
      //s.Description = "Create a new Contributor. A valid name is required.";
      // s.ExampleRequest = new CreateProductPricingRequest { Name = "Contributor Name" };
    });
  }

  public override async Task HandleAsync(
    CreateProductPricingRequest request,
    CancellationToken cancellationToken)
  {
    var productPricingDto = _mapper.Map<ProductPricingDto>(request.ProductPricing);
    var result = await _mediator.Send(new CreateProductPricingCommand(productPricingDto), cancellationToken);

    if (result.IsSuccess)
    {
      await this.SendAsync(new CreateProductPricingResponse(_mapper.Map<ProductPricingRecord>(result.Value)), StatusCodes.Status201Created, cancellationToken);
    }
    else
      await this.SendAsync(new CreateProductPricingResponse(ProductPricingRecord.CreateEmptyProductPricingRecord()), StatusCodes.Status500InternalServerError);
  }
}

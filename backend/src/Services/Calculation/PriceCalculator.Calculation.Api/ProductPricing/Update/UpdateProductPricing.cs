using FastEndpoints;
using MediatR;
using PriceCalculator.Calculation.API.ProductPricing.Records;
using PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;
using PriceCalculator.Calculation.UseCases.ProductPricing.Get;
using PriceCalculator.Calculation.UseCases.ProductPricing.Update;
using IMapper = AutoMapper.IMapper;

namespace PriceCalculator.Calculation.API.ProductPricing.Update;

public class UpdateProductPricing : Endpoint<UpdateProductPricingRequest, UpdateProductPricingResponse>
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public UpdateProductPricing(IMediator mediator, IMapper mapper)
    {
        _mediator = mediator;
        _mapper = mapper;
    }

    public override void Configure()
    {
        Put(UpdateProductPricingRequest.Route);
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
      UpdateProductPricingRequest request,
      CancellationToken cancellationToken)
    {
        var productPricingDto = _mapper.Map<ProductPricingDto>(request.ProductPricing);
        var result = await _mediator.Send(new UpdateProductPricingCommand(productPricingDto), cancellationToken);

        if (result.IsSuccess)
        {
            await this.SendAsync(new UpdateProductPricingResponse(_mapper.Map<ProductPricingRecord>(result.Value)), StatusCodes.Status200OK, cancellationToken);
        }
        else
        {
            var command = new GetProductPricingQuery(request?.ProductPricing?.Id ?? 0);
            var getResult = await _mediator.Send(command, cancellationToken);
            if (getResult.IsSuccess)
                await this.SendAsync(new UpdateProductPricingResponse(_mapper.Map<ProductPricingRecord>(getResult.Value)), StatusCodes.Status500InternalServerError);
            else
                await this.SendAsync(new UpdateProductPricingResponse(ProductPricingRecord.CreateEmptyProductPricingRecord()), StatusCodes.Status404NotFound);
        }

    }
}
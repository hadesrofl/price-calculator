using System.Collections.Immutable;
using FastEndpoints;
using MediatR;
using PriceCalculator.Calculation.UseCases.Currencies.List;

namespace PriceCalculator.Calculation.API.Currencies.List;

public class ListCurrencies : EndpointWithoutRequest<ListCurrenciesResponse>
{
    public static string Route => "/Currency";
    private readonly IMediator _mediator;

    public ListCurrencies(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override void Configure()
    {
        Get(Route);
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListCurrenciesQuery(), cancellationToken);

        if (result.IsSuccess)
        {
            Response = new(result.Value);
        }
        else
        {
            await SendAsync(new(ImmutableList.Create<ISO._4217.Models.Currency>()), StatusCodes.Status500InternalServerError, cancellationToken);
        }
    }
}

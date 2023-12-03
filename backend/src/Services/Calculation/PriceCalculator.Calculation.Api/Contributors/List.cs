﻿using FastEndpoints;
using MediatR;
using PriceCalculator.Calculation.UseCases.Contributors.List;

namespace PriceCalculator.Calculation.API.Contributors;

/// <summary>
/// List all Contributors
/// </summary>
/// <remarks>
/// List all contributors - returns a ContributorListResponse containing the Contributors.
/// </remarks>
public class List : EndpointWithoutRequest<ContributorListResponse>
{
    private readonly IMediator _mediator;

    public List(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override void Configure()
    {
        Get("/Contributors");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new ListContributorsQuery(null, null));

        if (result.IsSuccess)
        {
            Response = new ContributorListResponse
            {
                Contributors = result.Value.Select(c => new ContributorRecord(c.Id, c.Name)).ToList()
            };
        }
    }
}
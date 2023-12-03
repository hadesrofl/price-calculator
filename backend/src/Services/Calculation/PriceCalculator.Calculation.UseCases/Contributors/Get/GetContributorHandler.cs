﻿using Ardalis.Result;
using Ardalis.SharedKernel;
using PriceCalculator.Calculation.Core.ContributorAggregate;
using PriceCalculator.Calculation.Core.ContributorAggregate.Specifications;

namespace PriceCalculator.Calculation.UseCases.Contributors.Get;

/// <summary>
/// Queries don't necessarily need to use repository methods, but they can if it's convenient
/// </summary>
public class GetContributorHandler : IQueryHandler<GetContributorQuery, Result<ContributorDTO>>
{
    private readonly IReadRepository<Contributor> _repository;

    public GetContributorHandler(IReadRepository<Contributor> repository)
    {
        _repository = repository;
    }

    public async Task<Result<ContributorDTO>> Handle(GetContributorQuery request, CancellationToken cancellationToken)
    {
        var spec = new ContributorByIdSpec(request.ContributorId);
        
        var entity = await _repository.FirstOrDefaultAsync(spec, cancellationToken);
        if (entity == null) return Result.NotFound();

        return new ContributorDTO(entity.Id, entity.Name);
    }
}

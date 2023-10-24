using Ardalis.Result;
using Ardalis.SharedKernel;

namespace PriceCalculator.Calculation.UseCases.Contributors.Get;

public record GetContributorQuery(int ContributorId) : IQuery<Result<ContributorDTO>>;
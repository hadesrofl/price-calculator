using Ardalis.Result;
using Ardalis.SharedKernel;

namespace Price_Calculator.Backend.UseCases.Contributors.Get;

public record GetContributorQuery(int ContributorId) : IQuery<Result<ContributorDTO>>;
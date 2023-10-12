using Ardalis.Result;
using Ardalis.SharedKernel;

namespace Price_Calculator.Backend.UseCases.Contributors.List;

public record ListContributorsQuery(int? Skip, int? Take) : IQuery<Result<IEnumerable<ContributorDTO>>>;
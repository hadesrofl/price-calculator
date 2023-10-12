using Ardalis.Result;
using Ardalis.SharedKernel;

namespace Price_Calculator.Backend.UseCases.Contributors.Update;

public record UpdateContributorCommand(int ContributorId, string NewName) : ICommand<Result<ContributorDTO>>;
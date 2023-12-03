using Ardalis.Result;
using Ardalis.SharedKernel;

namespace PriceCalculator.Calculation.UseCases.Contributors.Update;

public record UpdateContributorCommand(int ContributorId, string NewName) : ICommand<Result<ContributorDTO>>;
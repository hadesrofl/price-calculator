using Ardalis.Result;
using Ardalis.SharedKernel;

namespace PriceCalculator.Calculation.UseCases.Contributors.Delete;

public record DeleteContributorCommand(int ContributorId) : ICommand<Result>;
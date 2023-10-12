using Ardalis.Result;
using Ardalis.SharedKernel;

namespace Price_Calculator.Backend.UseCases.Contributors.Delete;

public record DeleteContributorCommand(int ContributorId) : ICommand<Result>;
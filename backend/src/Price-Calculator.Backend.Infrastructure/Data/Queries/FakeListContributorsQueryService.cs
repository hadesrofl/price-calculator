using Price_Calculator.Backend.UseCases.Contributors;
using Price_Calculator.Backend.UseCases.Contributors.List;

namespace Price_Calculator.Backend.Infrastructure.Data.Queries;

public class FakeListContributorsQueryService : IListContributorsQueryService
{
    public Task<IEnumerable<ContributorDTO>> ListAsync()
    {
        var result = new List<ContributorDTO>() { new ContributorDTO(1, "Ardalis"), new ContributorDTO(2, "Snowfrog") };
        return Task.FromResult(result.AsEnumerable());
    }
}
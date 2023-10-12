using Ardalis.Specification;

namespace Price_Calculator.Backend.Core.ContributorAggregate.Specifications;

public class ContributorByIdSpec : Specification<Contributor>
{
    public ContributorByIdSpec(int contributorId)
    {
        Query
            .Where(contributor => contributor.Id == contributorId);
    }
}
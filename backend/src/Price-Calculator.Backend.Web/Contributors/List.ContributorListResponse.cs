using Price_Calculator.Backend.Web.ContributorEndpoints;

namespace Price_Calculator.Backend.Web.Endpoints.ContributorEndpoints;

public class ContributorListResponse
{
    public List<ContributorRecord> Contributors { get; set; } = new();
}
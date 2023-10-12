using Price_Calculator.Backend.Web.ContributorEndpoints;

namespace Price_Calculator.Backend.Web.Endpoints.ContributorEndpoints;

public class UpdateContributorResponse
{
    public UpdateContributorResponse(ContributorRecord contributor)
    {
        Contributor = contributor;
    }

    public ContributorRecord Contributor { get; set; }
}
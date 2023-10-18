namespace Price_Calculator.Backend.Web.Contributors;

public class UpdateContributorResponse
{
    public UpdateContributorResponse(ContributorRecord contributor)
    {
        Contributor = contributor;
    }

    public ContributorRecord Contributor { get; set; }
}
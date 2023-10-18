using System.ComponentModel.DataAnnotations;

namespace Price_Calculator.Backend.Web.Contributors;

public class CreateContributorRequest
{
    public const string Route = "/Contributors";

    [Required] public string? Name { get; set; }
}
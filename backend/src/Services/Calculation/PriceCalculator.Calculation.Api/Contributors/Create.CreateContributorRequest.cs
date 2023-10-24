using System.ComponentModel.DataAnnotations;

namespace PriceCalculator.Calculation.API.Contributors;

public class CreateContributorRequest
{
    public const string Route = "/Contributors";

    [Required] public string? Name { get; set; }
}
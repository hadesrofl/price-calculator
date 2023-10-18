using System.ComponentModel.DataAnnotations;

namespace Price_Calculator.Backend.Web.ProductPricing.Records;

public record ProductRecord
{
  [Required] public required string? Name { get; init; }
  [Required] public required string? Category { get; init; }
}

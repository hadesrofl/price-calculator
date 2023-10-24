using System.ComponentModel.DataAnnotations;

namespace PriceCalculator.Calculation.API.ProductPricing.Records;

public record ProductRecord
{
  [Required] public required string? Name { get; init; }
  [Required] public required string? Category { get; init; }
}

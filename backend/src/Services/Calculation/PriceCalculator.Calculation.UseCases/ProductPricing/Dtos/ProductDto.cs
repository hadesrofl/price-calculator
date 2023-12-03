using System.ComponentModel.DataAnnotations;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

public record ProductDto
{
  [Required] public required string? Name { get; init; }
  [Required] public required string? Category { get; init; }
}

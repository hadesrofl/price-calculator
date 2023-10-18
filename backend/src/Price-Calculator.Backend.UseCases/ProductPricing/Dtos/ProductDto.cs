using System.ComponentModel.DataAnnotations;

namespace Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

public record ProductDto
{
  [Required] public required string? Name { get; init; }
  [Required] public required string? Category { get; init; }
}

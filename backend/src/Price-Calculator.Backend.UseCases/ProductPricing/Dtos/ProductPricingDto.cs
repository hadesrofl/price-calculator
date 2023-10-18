using System.ComponentModel.DataAnnotations;

namespace Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

public record ProductPricingDto
{
  public int Id { get; init; }
  [Required] public required ProductDto? Product { get; init; }
  [Required] public required CalculationDto? Calculation { get; init; }
}

using System.ComponentModel.DataAnnotations;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

public record CalculationDto
{
  [Required] public required int SalesVolume { get; init; }
  [Required] public required decimal PricePerUnit { get; init; }
  [Required] public required string Currency { get; init; } = null!;
  public List<CostDto> Costs { get; init; } = new();
  public CostPerformanceCalculationDto CostPerformanceCalculation { get; init; } = null!;
}

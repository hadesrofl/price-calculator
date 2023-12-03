using System.ComponentModel.DataAnnotations;

namespace PriceCalculator.Calculation.API.ProductPricing.Records;

public record CalculationRecord
{
  [Required] public required int SalesVolume { get; init; }
  [Required] public required decimal PricePerUnit { get; init; }
  [Required] public required string Currency { get; init; } = null!;

  public List<CostRecord> Costs { get; init; } = new();
  public CostPerformanceCalculationRecord? CostPerformanceCalculation { get; init; } = null;

}

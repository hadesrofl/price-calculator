using System.ComponentModel.DataAnnotations;

namespace PriceCalculator.Calculation.API.ProductPricing.Records;

public record ProductPricingRecord
{
  public int Id { get; init; }
  [Required] public required ProductRecord? Product { get; set; }
  [Required] public required CalculationRecord? Calculation { get; set; }
}

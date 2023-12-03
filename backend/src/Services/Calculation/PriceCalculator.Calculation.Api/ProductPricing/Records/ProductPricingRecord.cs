using System.ComponentModel.DataAnnotations;

namespace PriceCalculator.Calculation.API.ProductPricing.Records;

public record ProductPricingRecord
{
  public int Id { get; init; }
  [Required] public required ProductRecord Product { get; set; }
  [Required] public required CalculationRecord Calculation { get; set; }

  public static ProductPricingRecord CreateEmptyProductPricingRecord() => new ProductPricingRecord()
  {
    Product = new ProductRecord() { Name = "", Category = "" },
    Calculation = new CalculationRecord() { SalesVolume = 0, PricePerUnit = 0, Currency = "EUR" }
  };
}

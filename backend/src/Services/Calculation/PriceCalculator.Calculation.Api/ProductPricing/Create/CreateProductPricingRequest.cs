using System.ComponentModel.DataAnnotations;
using PriceCalculator.Calculation.API.ProductPricing.Records;

namespace PriceCalculator.Calculation.API.ProductPricing.Create;

public class CreateProductPricingRequest
{
  public const string Route = "/ProductPricing";

  [Required] public ProductPricingRecord ProductPricing { get; init; } = ProductPricingRecord.CreateEmptyProductPricingRecord();
}

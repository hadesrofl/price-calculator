using System.ComponentModel.DataAnnotations;
using Price_Calculator.Backend.Web.ProductPricing.Records;

namespace Price_Calculator.Backend.Web.ProductPricing.Create;

public class CreateProductPricingRequest
{
  public const string Route = "/ProductPricing";

  [Required] public ProductPricingRecord? ProductPricing { get; init; }
}

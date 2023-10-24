namespace PriceCalculator.Calculation.API.ProductPricing.Get;

public class GetProductPricingByIdRequest
{
  public const string Route = "/ProductPricing/{ProductPricingId:int}";

  public int ProductPricingId { get; set; }

  public static string BuildRoute(int productPricingId)
  {
    return Route.Replace("{ProductPricingId:int}", productPricingId.ToString());
  }
}

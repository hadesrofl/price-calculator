using System.ComponentModel.DataAnnotations;
using PriceCalculator.Calculation.API.ProductPricing.Records;

namespace PriceCalculator.Calculation.API.ProductPricing.Update;

public class UpdateProductPricingRequest
{
    private int _productPricingId;
    public const string Route = "/ProductPricing/{ProductPricingId:int}";

    public int ProductPricingId
    {
        get => _productPricingId; init
        {
            _productPricingId = value;
            ProductPricing = ProductPricing with { Id = _productPricingId };
        }
    }

    [Required]
    public ProductPricingRecord ProductPricing { get; init; } = ProductPricingRecord.CreateEmptyProductPricingRecord();

    public static string BuildRoute(int productPricingId)
    {
        return Route.Replace("{ProductPricingId:int}", productPricingId.ToString());
    }
}
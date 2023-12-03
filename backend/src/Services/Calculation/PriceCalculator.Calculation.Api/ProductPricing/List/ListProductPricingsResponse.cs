using PriceCalculator.Calculation.API.ProductPricing.Records;

namespace PriceCalculator.Calculation.API.ProductPricing.List;

public record ListProductPricingsResponse(List<ProductPricingRecord> ProductPricings);

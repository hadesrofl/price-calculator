using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.API.ProductPricing.Records;

public record CostRecord(String Name, CostType Type, decimal Amount);

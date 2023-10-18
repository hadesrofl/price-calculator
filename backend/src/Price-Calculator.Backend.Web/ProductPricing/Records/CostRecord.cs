using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace Price_Calculator.Backend.Web.ProductPricing.Records;

public record CostRecord(String Name, CostType Type, decimal Amount);

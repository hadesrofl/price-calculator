using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace Price_Calculator.Backend.UseCases.ProductPricing.Dtos;

public record CostDto(String Name, CostType Type, decimal Amount);

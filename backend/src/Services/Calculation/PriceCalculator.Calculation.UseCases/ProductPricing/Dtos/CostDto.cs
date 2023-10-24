using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

public record CostDto(String Name, CostType Type, decimal Amount);

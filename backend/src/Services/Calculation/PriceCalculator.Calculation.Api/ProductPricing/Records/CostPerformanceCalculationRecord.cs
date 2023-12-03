namespace PriceCalculator.Calculation.API.ProductPricing.Records;

public record CostPerformanceCalculationRecord(decimal TotalCosts, decimal OwnCosts, decimal BreakEven, decimal Revenue,
  decimal UnitContributionMargin, decimal Profit);

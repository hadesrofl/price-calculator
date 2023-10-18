namespace Price_Calculator.Backend.Web.ProductPricing.Records;

public record CostPerformanceCalculationRecord(decimal TotalCosts, decimal OwnCosts, decimal BreakEven, decimal Revenue,
  decimal UnitContributionMargin, decimal Profit);

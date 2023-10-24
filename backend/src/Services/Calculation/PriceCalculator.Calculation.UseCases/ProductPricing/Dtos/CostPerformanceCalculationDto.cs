namespace PriceCalculator.Calculation.UseCases.ProductPricing.Dtos;

public record CostPerformanceCalculationDto
{
  public required decimal TotalCosts { get; init; }
  public required decimal OwnCosts { get; init; }
  public required decimal BreakEven { get; init; } 
  public required decimal Revenue { get; init; }
  public required decimal UnitContributionMargin { get; init; }
  public required decimal Profit { get; init; }
};

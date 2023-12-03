using Ardalis.SharedKernel;
using PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;

namespace PriceCalculator.Calculation.Core.ProductPricingAggregate.CalculationEntity;

/// <summary>
///   Represents a price calculation
/// </summary>
public class Calculation : EntityBase
{
  private readonly List<Cost> _costs = new();

  /// <summary>
  ///   Empty constructor for EFCore
  /// </summary>
  public Calculation() : this(0, new Amount())
  {
  }

  /// <summary>
  ///   Constructor
  /// </summary>
  /// <param name="salesVolume">Is the possible amount of products to sell</param>
  /// <param name="pricePerUnit">Is the price per product</param>
  /// <exception cref="ArgumentOutOfRangeException">Is thrown in case sales volume is not a positive value</exception>
  public Calculation(int salesVolume, Amount pricePerUnit)
  {
    SalesVolume = salesVolume >= 0 ? salesVolume : throw new ArgumentOutOfRangeException(nameof(salesVolume));
    PricePerUnit = pricePerUnit;
  }

  /// <summary>
  ///   The max volume that can be sold
  /// </summary>
  public int SalesVolume { get; set; }

  /// <summary>
  ///   The price per unit of the product
  /// </summary>
  public Amount PricePerUnit { get; private set; }

  public IReadOnlyCollection<Cost> Costs => _costs.AsReadOnly();

  /// <summary>
  ///   The calculation of the performance of this pricing regarding revenue and costs
  /// </summary>
  public CostPerformanceCalculation CostPerformanceCalculation => CostPerformanceCalculation.Calculate(this);

  /// <summary>
  ///   Adds a <see cref="Cost" /> object to this calculation.
  ///   In case of <see cref="CostType.Discount" /> will update the discount value according to the
  ///   <see cref="PricePerUnit" />.
  /// </summary>
  /// <param name="name">Is the name of the cost</param>
  /// <param name="value">Is the value of the cost</param>
  /// <param name="currency">Is the <see cref="Currency" /> of the value</param>
  /// <param name="type">Is the type of cost (see <see cref="CostType" />)</param>
  public void AddCost(string name, decimal value, Currency currency, CostType type)
  {
    var valueTolerance = new decimal(0.001);
    var existingItem = Costs.FirstOrDefault(c =>
      c.Name == name && Math.Abs(c.Amount.Value - value) < valueTolerance && c.Amount.Currency.Name == currency.Name &&
      c.Type == type);
    if (existingItem == null)
    {
      var cost = new Cost(name, value, currency, type);
      cost.ApplyDiscountAndUpdateValue(PricePerUnit);
      _costs.Add(cost);
    }
    else
    {
      existingItem.ApplyDiscountAndUpdateValue(PricePerUnit);
    }
  }

  /// <summary>
  ///   Takes a collection of costs and adds it to this calculation.
  ///   In case of <see cref="CostType.Discount" /> will update the discount value according to the
  ///   <see cref="PricePerUnit" />.
  /// </summary>
  /// <param name="costs">Are the costs to add.</param>
  public void AddCosts(IEnumerable<Cost> costs)
  {
    foreach (var cost in costs)
    {
      AddCost(cost.Name, cost.Type == CostType.Discount ? cost.Discount.PercentageValue : cost.Amount.Value,
        cost.Amount.Currency,
        cost.Type);
    }
  }

  /// <summary>
  ///   Updates the <see cref="PricePerUnit" /> and recalculates all <see cref="CostType.Discount" />s.
  /// </summary>
  /// <param name="newAmount">Is the new price per unit</param>
  public void UpdatePrice(Amount newAmount)
  {
    PricePerUnit = newAmount;
    CalculateDiscounts();
  }

  /// <summary>
  /// Updates the calculation by using values of a given updated calculation object
  /// </summary>
  /// <param name="updatedCalculation">Is the object with the new values</param>
  /// <returns>An updated version of the calculation entity</returns>
  public Calculation Update(Calculation updatedCalculation)
  {
    var newCalculation = new Calculation(updatedCalculation.SalesVolume, updatedCalculation.PricePerUnit)
    {
      Id = Id
    };
    newCalculation.AddCosts(updatedCalculation.Costs);
    _ = newCalculation.CostPerformanceCalculation; // used to calculate cost performance after creation
    return newCalculation;
  }

  private void CalculateDiscounts()
  {
    _costs.ForEach(c => c.ApplyDiscountAndUpdateValue(PricePerUnit));
  }
}

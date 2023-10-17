namespace Price;

/// <summary>
/// Enum for different types of costs
/// </summary>
public enum CostType
{
  FixedCost,
  VariableCost,
  Discount
}

/// <summary>
/// Represents cost of a product
/// </summary>
public class Cost
{
  /// <summary>
  /// Constructor
  /// </summary>
  /// <param name="name">Is the name of the cost</param>
  /// <param name="value">Is the value of the cost entry.
  /// Needs to be calculated with <see cref="ApplyDiscountAndUpdateValue"/> in case of <see cref="CostType.Discount"/></param>
  /// <param name="currency">Is the <see cref="Currency"/> of the value</param>
  /// <param name="type">Is the <see cref="CostType"/></param>
  /// <exception cref="ArgumentOutOfRangeException">Is thrown in case the value is non-positive</exception>
  public Cost(string name, decimal value, Currency currency, CostType type)
  {
    Name = name;
    Type = type;
    if (Type == CostType.Discount)
    {
      Discount = new Discount(value);
      Amount = new Amount(0, currency);
    }
    else
    {
      Discount = new Discount(0);
      Amount = new Amount(value, currency);
    }
  }

  /// <summary>
  /// Is the name of the cost
  /// </summary>
  public string Name { get; }
  
  /// <summary>
  /// Is the financial value of the cost
  /// </summary>
  public Amount Amount { get; private set; }

  /// <summary>
  /// Is the type of cost to distinguish the cost entry
  /// </summary>
  public CostType Type { get; }

  /// <summary>
  /// Is the information about discounting if <see cref="Type"/> is <see cref="CostType.Discount"/>.
  /// Based on this information <see cref="ApplyDiscountAndUpdateValue"/> will update the <see cref="Amount"/> of this cost entry.
  /// </summary>
  public Discount Discount { get; }

  /// <summary>
  /// Checks whether this cost entry is a <see cref="CostType.Discount"/> and the currency of the given
  /// <see cref="Price.Amount"/> equals the costs <see cref="Currency"/>.
  /// If both is true the <see cref="Amount"/> will be updated to the specific discount and applied as cost to the product. 
  /// </summary>
  /// <param name="amount">Is the price per unit which is necessary to determine the discount which is applied by a percentage of the price</param>
  public void ApplyDiscountAndUpdateValue(Amount amount)
  {
    // TODO: Enhancement - Implement exchange rates and allow conversion of one currency to another
    if (Type == CostType.Discount && amount.Currency.Equals(amount.Currency))
    {
      Amount = Amount with { Value =  amount.Value * Discount.PercentageValue / 100};
    }
  }
}

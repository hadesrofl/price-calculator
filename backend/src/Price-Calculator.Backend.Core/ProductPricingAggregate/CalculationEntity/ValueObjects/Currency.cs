namespace Price;

/// <summary>
///   Represents a currency that is tied to a value
/// </summary>
public record Currency
{
  /// <summary>
  ///   Empty constructor for EFCore
  /// </summary>
  public Currency()
  {
  }

  /// <summary>
  ///   Constructor
  /// </summary>
  /// <param name="name">Is the name of the currency in English</param>
  /// <param name="symbol">Is the symbol for the currency</param>
  public Currency(string name, string symbol)
  {
    Name = name;
    Symbol = symbol;
  }

  /// <summary>
  ///   Identifier for the database
  /// </summary>
  public int Id { get; set; }

  /// <summary>
  ///   Is the name of the currency in English
  /// </summary>
  public string Name { get; set; } = string.Empty;

  /// <summary>
  ///   Is the currency symbol as string
  /// </summary>
  public string Symbol { get; set; } = string.Empty;

  /// <inheritdoc />
  public virtual bool Equals(Currency? other)
  {
    return other != null && Name == other.Name && Symbol == other.Symbol;
  }

  /// <inheritdoc />
  public override int GetHashCode()
  {
    return HashCode.Combine(Id, Name, Symbol);
  }
}

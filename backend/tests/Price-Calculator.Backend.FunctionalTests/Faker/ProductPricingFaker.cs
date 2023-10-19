using Bogus;
using Price_Calculator.Backend.Core.ProductPricingAggregate;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.CalculationEntity.ValueObjects;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity;
using Price_Calculator.Backend.Core.ProductPricingAggregate.ProductEntity.ValueObjects;

namespace Price_Calculator.Backend.FunctionalTests.Faker;

public class ProductPricingFaker : Faker<ProductPricing>
{
  public ProductPricingFaker()
  {
    RuleFor(pp => pp.Product, new ProductFaker().Generate());
    RuleFor(pp => pp.Calculation, new CalculationFaker().Generate());
  }
}

public class CalculationFaker : Faker<Calculation>
{
  public CalculationFaker()
  {
    RuleFor(c => c.SalesVolume, f => f.Finance.Random.Int(1, Int32.MaxValue));
    FinishWith((_, c) =>
    {
      c.AddCosts(new CostFaker().Generate(new Randomizer().Int(0, 10)));
      c.UpdatePrice(new AmountFaker().Generate());
      var cpc = c.CostPerformanceCalculation;
    });
  }
}

public class AmountFaker : Faker<Amount>
{
  public AmountFaker()
  {
    RuleFor(a => a.Value, f => f.Finance.Amount());
    RuleFor(a => a.Currency, new CurrencyFaker().Generate());
  }
}

public class CostFaker : Faker<Cost>
{
  public CostFaker()
  {
    var randomizer = new Randomizer();
    var costType = (CostType)randomizer.Int((int)CostType.FixedCost, (int)CostType.Discount);
    var costName = costType switch
    {
      CostType.FixedCost => new Bogus.Faker().Commerce.Department(),
      CostType.VariableCost => new Bogus.Faker().Commerce.ProductMaterial(),
      CostType.Discount => new Bogus.Faker().Company.CompanyName(),
      _ => throw new ArgumentOutOfRangeException()
    };
    
    RuleFor(c => c.Name, f => costName);
    RuleFor(c => c.Type, costType);
    RuleFor(c => c.Discount, costType == CostType.Discount ? new Discount(randomizer.Decimal(0, 75)) : new Discount(0));
    RuleFor(c => c.Amount, costType == CostType.Discount ? new Amount(0, new CurrencyFaker().Generate()) : new AmountFaker().Generate());
  }
}

public class CurrencyFaker : Faker<Currency>
{
  public CurrencyFaker()
  {
    RuleFor(c => c.Name, f => f.Finance.Currency().Code);
  }
}

public class ProductFaker : Faker<Product>
{
  public ProductFaker()
  {
    RuleFor(p => p.Name, f => f.Commerce.Product());
    RuleFor(p => p.Category, new ProductCategoryFaker().Generate());
  }
}

public class ProductCategoryFaker : Faker<ProductCategory>
{
  public ProductCategoryFaker()
  {
    RuleFor(pc => pc.Name, f => f.Commerce.Categories(1)[0]);
  }
}

using System.Collections.Immutable;

namespace PriceCalculator.Calculation.API.Currencies.List;

public record ListCurrenciesResponse(ImmutableList<ISO._4217.Models.Currency> Currencies);
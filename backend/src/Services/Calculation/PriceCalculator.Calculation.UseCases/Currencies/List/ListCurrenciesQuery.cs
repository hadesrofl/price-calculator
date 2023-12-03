using System.Collections.Immutable;
using Ardalis.Result;
using Ardalis.SharedKernel;

namespace PriceCalculator.Calculation.UseCases.Currencies.List;

public record ListCurrenciesQuery : IQuery<Result<ImmutableList<ISO._4217.Models.Currency>>>;

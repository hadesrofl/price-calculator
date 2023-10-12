---
layout: default
title: Calculation
parent: Entities
grand_parent: "Domain: Price-Calculation"
nav_order: 2
---

# Calculation

A calculation holds costs, a sales price and the cost performance calculation.
{: .fs-6 .fw-300 }

## Content

* Sales Volume
* Price per Unit
  * including [Currency](../value-objects/currency.md)
* [Costs](../value-objects/costs.md)
* [Cost Performance Calculation](../value-objects/cost-performance-calculation.md) (will be calculated and should only be read-only outside the entity)

```mermaid
classDiagram
    Calculation *-- CostPerformanceCalculation
    Calculation "1" *-- "0.." Cost
    Calculation o-- Currency
    class Calculation {
        +int SalesVolume
        +double PricePerUnit
    }

    class CostPerformanceCalculation {
        +double TotalCosts
        +double OwnCosts
        +double BreakEven
        +double Revenue
        +double UnitContributionMargin
        +double Profit
    }

    class Cost {
        +string Name
        +double Value
        +CostType Type
        +Currency Currency
    }

    class Currency {
        +string Name
    }
```
---
layout: default
title: Cost Performance Calculation
parent: Value Objects
grand_parent: "Domain: Price-Calculation"
nav_order: 3
---

# Cost Performance Calculation

This performance calculation holds the [derived values](../derived-values.md) and allows to evaluate a pricing.
{: .fs-6 .fw-300 }

## Content

* Total Costs
* Own Costs
* Break Even
* Revenue
* Unit Contribution Margin
* Profit

```mermaid
classDiagram
    class CostPerformanceCalculation {
        +double TotalCosts
        +double OwnCosts
        +double BreakEven
        +double Revenue
        +double UnitContributionMargin
        +double Profit
    }
```
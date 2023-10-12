---
layout: default
title: Costs
parent: Value Objects
grand_parent: "Domain: Price-Calculation"
nav_order: 1
---

# Costs

Basically a value with a name. Thus hard to identify and tightly coupled to a calculation.
{: .fs-6 .fw-300 }

## Content

* Name of Cost
* Value of Cost
* Type (Fix, Variable, Discount)
* [Currency](./currency.md)

```mermaid
classDiagram
    Cost ..> Currency
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
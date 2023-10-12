---
layout: default
title: Product Pricing
parent: Aggregates
grand_parent: "Domain: Price-Calculation"
nav_order: 1
---

# Product Pricing

Combines a referenced product with a particular calculation.
{: .fs-6 .fw-300 }

## Content

* Reference for product
  * (until there is a product service to resolve the reference by)
    * Name of product 
    * Category of product
    * Distinguishable Feature (e.g. books could have page count)
* [Calculation](../entities/calculation.md) (Root of Aggregate)

```mermaid
classDiagram
    Product *-- ProductCategory
    ProductPricing "0.." o-- "1" Product
    ProductPricing *-- Calculation
    class ProductPricing {
        
    }

    class Product {
        +string Name
    }

    class ProductCategory {
        +string Name
    }
    
    class Calculation {
        +int SalesVolume
        +double PricePerUnit
        +CostPerformanceCalculation CPC
        +Cost[] Costs
        +Currency Currency
    }
```
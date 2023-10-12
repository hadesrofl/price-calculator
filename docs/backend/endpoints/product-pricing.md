---
layout: default
title: Product Pricing
parent: Endpoints
grand_parent: Backend
nav_order: 2
---

# Product Pricing

Handling operations on [product-pricing](../../domain/aggregates/product-pricing.md).
{: .fs-6 .fw-300 }

## Endpoints

* Create: POST api/product-pricing
  * Fields
    * [Calculation](../../domain/entities/calculation.md)
    * Reference to Product (until a product service is established)
* Update: PUT api/product-pricing/{id}
  * Fields
    * [Calculation](../../domain/entities/calculation.md)
    * Reference to Product (until a product service is established)
* List: GET api/product-pricing/
* Get: GET api/product-pricing/{id}
* Delete: DELETE api/product-pricing/{id}
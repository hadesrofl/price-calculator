---
layout: default
title: Product
parent: Endpoints
grand_parent: Backend
nav_order: 1
---

# Product

Until a product service is established, we hold some basic product data.
{: .fs-6 .fw-300 }

## Endpoints

* Create: POST api/product
  * Fields
    * Name
    * Category
* Update: PUT api/product/{id}
  * Fields
    * Name
    * Category
* List: GET api/product/
* Get: GET api/product/{id}
* Delete: DELETE api/product/{id}
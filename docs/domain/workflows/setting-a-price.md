---
layout: default
title: Setting a Price
parent: Workflow
grand_parent: "Domain: Price-Calculation"
nav_order: 1
---

# Setting a Price

A user gets help from the calculator but in the end the user needs to set on a price.
{: .fs-6 .fw-300 }

## Workflow: Setting a Price

This workflow is handled on the frontend side. While some derived calculations (see [Derived Values](../derived-values.md)) can be done on the backend side, it would be a bigger overhead sending requests there and back again for some simple calculations.

```mermaid
flowchart TD
    ST((Start))
    ST-- Determine -->FC[Fixed Costs]
    ST-- Determine -->VC[Variable Costs]
    CP[Calculate Price]
    FC --> CP
    VC --> CP
    SV[Set Sales Volume]
    SP[Set Sales Price]
    CP .-> SV
    CP .-> SP
    DEC{Price ok?}
    SV --> DEC
    SP --> DEC
    END>Calculation Done]
    DEC -- Yes --> END
    DEC -- NO --> CP
```
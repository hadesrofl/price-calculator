export type Cost = {
  label: string;
  value: number;
  currency: string;
};

export type Costs = {
  fixCosts: Cost[];
  variableCosts: Cost[];
};

export function createEmptyCosts() {
  return {
    fixCosts: [],
    variableCosts: [],
  };
}

export function areCostsEqual(costs: Cost[], otherCosts: Cost[]) {
  return (
    (costs.length === 0 && otherCosts.length === 0) ||
    (costs.length === otherCosts.length &&
      costs.every((cost) => otherCosts.find((c) => c.label === cost.label)))
  );
}

export function calculateTotalCosts(costs: Cost[]): number {
  return costs.reduce((totalCosts, cost) => totalCosts + cost.value, 0);
}

/**
 * The definition of a cost in this context
 */
export type Cost = {
  label: string;
  value: number;
  currency: string;
};

/**
 * The definition of our combined costs. Contains cost categories with single cost entries.
 */
export type Costs = {
  fixCosts: Cost[];
  variableCosts: Cost[];
};

/**
 * Builder function for creating an empty {@link Costs} entitiy.
 * @returns an empty {@link Costs} entity.
 */
export function createEmptyCosts() {
  return {
    fixCosts: [],
    variableCosts: [],
  };
}

/**
 * Checks whether or not two {@link Cost} arrays are equal
 * @param {Cost[]} costs Is an entry of costs
 * @param {Cost[]} otherCosts Is the another entry of costs
 * @returns {boolean} true in case both are equal, otherwise false
 */
export function areCostsEqual(costs: Cost[], otherCosts: Cost[]) {
  return (
    (costs.length === 0 && otherCosts.length === 0) ||
    (costs.length === otherCosts.length &&
      costs.every((cost) => otherCosts.find((c) => c.label === cost.label)))
  );
}

/**
 * Calculates the sum of all costs within the array
 * @param {Cost[]} costs Are the costs to sum up
 * @returns {number} the sum of all costs of that array
 */
export function sumCosts(costs: Cost[]): number {
  return costs.reduce((totalCosts, cost) => totalCosts + cost.value, 0);
}

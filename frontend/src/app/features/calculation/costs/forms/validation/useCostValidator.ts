import Joi, { ValidationError } from "joi";
import { useState } from "react";

/**
 * Validation schema for cost values
 */
export const valueSchema = Joi.number().positive().required();
/**
 * Validation schema for cost labels
 */
export const labelSchema = Joi.string().min(1).required();

/**
 * Creates a validator for {@link CostForm} and checks the form fields and manages their errors states
 * @returns a validator and its functions
 */
export function useCostValidator() {
  const [validationErrors, setValidationErrors] = useState({});

  const validate = (
    schema: Joi.NumberSchema | Joi.StringSchema,
    event: React.ChangeEvent<HTMLInputElement>
  ): { valid: boolean; value: number | string } => {
    if (event.target.value === "") return { valid: true, value: 0 };
    var validationResult = schema.validate(event.target.value);
    if (validationResult.error) {
      setValidationErrors({
        ...validationErrors,
        [event.target.name]: validationResult.error,
      });
      return { valid: false, value: validationResult.value };
    }

    setValidationErrors({
      ...validationErrors,
      [event.target.name]: "",
    });
    return { valid: true, value: validationResult.value };
  };

  const hasError = (key: string) => {
    const entry = Object.entries(validationErrors).find(([k, _]) => k == key);
    if (entry) return entry[1] !== "";
    return false;
  };

  const getError = (key: string) => {
    const errorObject = Object.entries(validationErrors).find(
      ([k, _]) => k === key
    );
    if (errorObject) return (errorObject[1] as ValidationError).message;
    return "";
  };

  return { validationErrors, validate, hasError, getError };
}

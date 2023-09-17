import Joi, { ValidationError } from "joi";
import { useState } from "react";

export const valueSchema = Joi.number().positive().required();
export const labelSchema = Joi.string().min(1).required();

export function useCostValidator() {
  const [validationErrors, setValidationErrors] = useState({});

  const validate = (
    schema: Joi.NumberSchema | Joi.StringSchema,
    event: React.ChangeEvent<HTMLInputElement>
  ): { valid: boolean; value: number | string } => {
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

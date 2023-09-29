import Joi from "joi";
import { useState } from "react";

/**
 * The validation schema for sales volume
 */
export const salesVolumeValidationSchema = Joi.number().positive();
/**
 * The validation schema for price per unit
 */
export const pricePerUnitValidationSchema = Joi.number().positive();
/**
 * The validation schema for discounts
 */
export const discountValidationSchema = Joi.number().min(0).max(100);

/**
 * Creates a validator for {@link SalesForm} and checks the form fields and manages their errors states
 * @returns a validator and its functions
 */
export function useSalesValidator() {
  const [validationErrors, setValidationErrors] = useState({
    salesVolume: "",
    pricePerUnit: "",
    discount: "",
  });

  const validate = (
    schema: Joi.NumberSchema,
    event: React.ChangeEvent<HTMLInputElement>
  ): { valid: boolean; value: number } => {
    var validationResult = schema.validate(event.target.value);
    if (validationResult.error) {
      setValidationErrors({
        ...validationErrors,
        [event.target.name]: validationResult.error.message,
      });
      return { valid: false, value: validationResult.value };
    }

    setValidationErrors({
      ...validationErrors,
      [event.target.name]: "",
    });
    return { valid: true, value: validationResult.value };
  };
  return { validationErrors, validate };
}

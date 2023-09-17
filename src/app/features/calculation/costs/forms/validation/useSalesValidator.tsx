import Joi from "joi";
import { useState } from "react";

export const salesVolumeValidationSchema = Joi.number().positive();
export const pricePerUnitValidationSchema = Joi.number().positive();

export function useSalesValidator() {
  const [validationErrors, setValidationErrors] = useState({
    salesVolume: "",
    pricePerUnit: "",
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

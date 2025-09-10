import { useForm, SubmitHandler } from "react-hook-form";

import { OrderFormProps, OrderFormData } from "@/types";

import { FORM_ERRORS } from "@/utils/messages/errorsMessages";
import {
  validateEmail,
  validateUsername,
  validatePhone,
  validateAddress,
} from "@/utils/validations/formValidators";

import styles from "./styles/OrderForm.module.css";

const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<OrderFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const submit: SubmitHandler<OrderFormData> = (data) => {
    onSubmit(data);
    reset();
  };

  const handleInputChange = (fieldName: keyof OrderFormData) => {
    clearErrors(fieldName);
  };

  return (
    <form
      id="orderForm"
      className={styles.orderForm}
      onSubmit={handleSubmit(submit)}
      autoComplete="off"
      noValidate
    >
      <div className={styles.formRow}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your name..."
          {...register("name", {
            required: FORM_ERRORS.fillThisField,
            validate: (value) =>
              validateUsername(value) || FORM_ERRORS.invalidUsername,
            onChange: () => handleInputChange("name"),
          })}
        />
        <div className={styles.errorContainer}>
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email..."
          {...register("email", {
            required: FORM_ERRORS.fillThisField,
            validate: (value) =>
              validateEmail(value) || FORM_ERRORS.invalidEmail,
            onChange: () => handleInputChange("email"),
          })}
        />
        <div className={styles.errorContainer}>
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone..."
          {...register("phone", {
            required: FORM_ERRORS.fillThisField,
            validate: (value) =>
              validatePhone(value) || FORM_ERRORS.invalidPhone,
            onChange: () => handleInputChange("phone"),
          })}
        />
        <div className={styles.errorContainer}>
          {errors.phone && (
            <span className={styles.error}>{errors.phone.message}</span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          placeholder="Enter your address..."
          {...register("address", {
            required: FORM_ERRORS.fillThisField,
            validate: (value) =>
              validateAddress(value) || FORM_ERRORS.invalidAddress,
            onChange: () => handleInputChange("address"),
          })}
        />
        <div className={styles.errorContainer}>
          {errors.address && (
            <span className={styles.error}>{errors.address.message}</span>
          )}
        </div>
      </div>
    </form>
  );
};

export { OrderForm };

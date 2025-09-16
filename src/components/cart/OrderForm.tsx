import { useForm, SubmitHandler } from "react-hook-form";

import { IOrderFormData } from "@/types";

import { FORM_ERRORS } from "@/utils/messages/errorsMessages";
import {
  validateEmail,
  validateUsername,
  validatePhone,
  validateAddress,
} from "@/utils/validations/formValidators";

import styles from "./styles/OrderForm.module.css";

interface IOrderFormProps {
  onSubmit: (data: IOrderFormData) => void;
  addressRef?: React.RefObject<HTMLInputElement | null>;
}

const OrderForm = ({ onSubmit, addressRef }: IOrderFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IOrderFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const submit: SubmitHandler<IOrderFormData> = (data) => {
    onSubmit(data);
    reset();
  };

  const handleInputChange = (field: keyof IOrderFormData) => {
    clearErrors(field);
  };

  const handleAddressRef = (element: HTMLInputElement | null) => {
    register("address").ref(element);

    if (addressRef && element) {
      const inputWithFormValue = element as HTMLInputElement & {
        setFormValue: (address: string) => void;
      };

      inputWithFormValue.setFormValue = (address: string) => {
        setValue("address", address, { shouldValidate: true });
        clearErrors("address");
      };

      addressRef.current = inputWithFormValue;
    }
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
          {...register("userName", {
            required: FORM_ERRORS.fillThisField,
            validate: (value) =>
              validateUsername(value) || FORM_ERRORS.invalidUsername,
            onChange: () => handleInputChange("userName"),
          })}
        />
        {errors.userName && (
          <span className={styles.error}>{errors.userName.message}</span>
        )}
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
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone..."
          {...register("phoneNumber", {
            required: FORM_ERRORS.fillThisField,
            validate: (value) =>
              validatePhone(value) || FORM_ERRORS.invalidPhone,
            onChange: () => handleInputChange("phoneNumber"),
          })}
        />
        {errors.phoneNumber && (
          <span className={styles.error}>{errors.phoneNumber.message}</span>
        )}
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
          ref={handleAddressRef}
        />
        {errors.address && (
          <span className={styles.error}>{errors.address.message}</span>
        )}
      </div>
    </form>
  );
};

export { OrderForm };

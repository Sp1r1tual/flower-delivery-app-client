import { CartType } from "../cart/cart";

type ContainerProps = {
  children: React.ReactNode;
  position?: "left" | "center" | "right";
  showBorder?: boolean;
};

type RowProps = {
  children: React.ReactNode;
  gap?: string;
  justify?: "start" | "center" | "end" | "space-between" | "space-around";
  margin?: string | number;
};

type OrderFormProps = {
  onSubmit: (data: {
    userName: string;
    email: string;
    phoneNumber: string;
    address: string;
  }) => void;
};

type TotalProps = {
  text: string;
  amount: number;
};

type CounterProps = {
  initialValue?: number;
  min?: number;
  max?: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onManualChange: (value: number) => void;
};

type BtnProps = {
  text: string;
  className?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

type CheckoutProps = {
  items: CartType[];
  loading: boolean;
  disabled?: boolean;
};

type ToastProps = {
  text: string;
  duration?: number;
  onClose: () => void;
};

type CenterWrapperProps = {
  children: React.ReactNode;
};

type ApiError = {
  message: string;
};

type AddToFavoriteProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

export type {
  ContainerProps,
  RowProps,
  OrderFormProps,
  TotalProps,
  CounterProps,
  BtnProps,
  CheckoutProps,
  ToastProps,
  CenterWrapperProps,
  AddToFavoriteProps,
  ApiError,
};

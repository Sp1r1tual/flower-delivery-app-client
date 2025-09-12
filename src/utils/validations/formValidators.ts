const validateEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateUsername = (value: string): boolean =>
  typeof value === "string" &&
  value.length >= 3 &&
  value.length <= 32 &&
  /^[a-zA-Z0-9_.-]+$/.test(value);

const validatePhone = (value: string): boolean =>
  typeof value === "string" && /^\+?\d{7,15}$/.test(value);

const validateAddress = (value: string): boolean =>
  typeof value === "string" && value.length >= 5 && value.length <= 128;

export { validateEmail, validateUsername, validatePhone, validateAddress };

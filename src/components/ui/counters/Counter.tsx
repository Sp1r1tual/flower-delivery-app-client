import { useState } from "react";

import { CounterProps } from "@/types";

import styles from "./styles/Counter.module.css";

const Counter = ({
  initialValue = 0,
  min = 0,
  max = Infinity,
  onIncrease,
  onDecrease,
  onManualChange,
}: CounterProps) => {
  const [value, setValue] = useState(initialValue);

  const updateValue = (newValue: number) => {
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    if (!isNaN(newValue)) {
      updateValue(newValue);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      updateValue(value - 1);
      onDecrease?.();
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      updateValue(value + 1);
      onIncrease?.();
    }
  };

  const handleBlur = () => {
    onManualChange(value);
  };

  return (
    <div className={styles.counter}>
      <button type="button" onClick={handleDecrease}>
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <button type="button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export { Counter };

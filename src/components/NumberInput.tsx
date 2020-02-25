import React, { ChangeEvent, RefObject, useState } from "react";

interface NumberInputProps {
  inputRef: RefObject<HTMLInputElement>;
  label: string;
  id: string;
  min: number;
  max: number;
  defaultValue: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  inputRef,
  label,
  id,
  min,
  max,
  defaultValue
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  return (
    <span className="number-input">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        placeholder={defaultValue.toString()}
        min={min}
        max={max}
        ref={inputRef}
        value={value}
        onChange={e => setValue(validateNumber(e, min, max))}
      />
    </span>
  );
};

const validateNumber: (
  e: ChangeEvent<HTMLInputElement>,
  min: number,
  max: number
) => number = (e, min, max) => {
  const { valueAsNumber, value } = e.target;
  if (!value || !/^\d+$/.test(value) || valueAsNumber < min) {
    return min;
  } else if (valueAsNumber > max) {
    return max;
  } else {
    return valueAsNumber;
  }
};

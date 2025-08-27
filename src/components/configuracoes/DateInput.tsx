// DateInput.tsx
import React from 'react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="config-input">
      <label>{label}</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DateInput;

// NumberInput.tsx
import React from 'react';

interface NumberInputProps {
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function NumberInput({ label, value, onChange, placeholder }: NumberInputProps) {
  return (
    <div className="config-input">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

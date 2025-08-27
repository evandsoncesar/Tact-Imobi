import React, { ChangeEvent } from 'react';

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}

export default function SelectInput({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: SelectInputProps) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <select
        className="input-select"
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Selecione</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

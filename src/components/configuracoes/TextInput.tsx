import React from 'react';
export default function TextInput({ label, value, onChange, disabled = false }: any) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}

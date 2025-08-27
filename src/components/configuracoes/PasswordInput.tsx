import React from 'react';
export default function PasswordInput({ label, value, onChange }: any) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type="password" value={value} onChange={onChange} />
    </div>
  );
}
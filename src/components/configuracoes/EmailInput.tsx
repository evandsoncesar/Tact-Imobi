import React from 'react';
export default function EmailInput({ label, value, onChange }: any) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type="email" value={value} onChange={onChange} />
    </div>
  );
}
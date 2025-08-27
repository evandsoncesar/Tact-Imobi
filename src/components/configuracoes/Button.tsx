// Button.tsx
import React from 'react';
export default function Button({ label, onClick }: any) {
  return <button onClick={onClick} className="btn">{label}</button>;
}
// components/CardIndicator.tsx
import React, { ReactNode } from 'react';
import '../../styles/dashboardPagesStyle/CardIndicator.css';

interface CardIndicatorProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
  color?: string;
}

const CardIndicator: React.FC<CardIndicatorProps> = ({
  title,
  value,
  icon,
  subtitle,
  color = '#29306A',
}) => {
  return (
    <div className="card-indicator">
      {icon && <div className="card-indicator-icon">{icon}</div>}
      <div className="card-indicator-info">
        <div className="card-indicator-title">{title}</div>
        <div className="card-indicator-value" style={{ color }}>
          {value}
        </div>
        {subtitle && <div className="card-indicator-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};

export default CardIndicator;

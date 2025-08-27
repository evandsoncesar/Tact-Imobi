// components/CardIndicatorSecondary.tsx
import React, { ReactNode } from 'react';
import '../../styles/dashboardPagesStyle/CardIndicatorSecondary.css';

interface CardIndicatorSecondaryProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
  color?: string;
}

const CardIndicatorSecondary: React.FC<CardIndicatorSecondaryProps> = ({
  title,
  value,
  icon,
  subtitle,
  color = '#29306A',
}) => {
  return (
    <div className="card-secondary">
      <div className="card-secondary-top">
        {icon && <div className="card-secondary-icon">{icon}</div>}
        <div className="card-secondary-value" style={{ color }}>
          {value}
        </div>
      </div>
      <div className="card-secondary-info">
        <div className="card-secondary-title">{title}</div>
        {subtitle && <div className="card-secondary-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};

export default CardIndicatorSecondary;

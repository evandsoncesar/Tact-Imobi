import React from 'react';
import '../../styles/dashboardPagesStyle/CardVSO.css';

interface CardVSOProps {
  title: string;
  value: string | number;
}

const CardVSO: React.FC<CardVSOProps> = ({ title, value }) => {
  const isVGV = title === 'VGV TOTAL' || title === 'VGV MENSAL';

  const valorFormatado = isVGV && typeof value === 'number'
    ? `R$ ${value.toLocaleString('pt-BR')}`
    : value;

  return (
    <div className={`vso-card ${isVGV ? 'vgv-card-destaque' : ''}`}>
      <div className="vso-title">{title}</div>
      <div className={`vso-value ${isVGV ? 'vgv-destaque' : ''}`}>
        {valorFormatado}
      </div>
    </div>
  );
};

export default CardVSO;

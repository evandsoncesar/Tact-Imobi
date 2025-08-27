import React, { useState } from 'react';
import GaugeRadialCustom from './VelocidadeVendasGauge';
import '../../../styles/dashboardPagesStyle/Charts.css';
import { Info } from 'lucide-react';

interface GaugeCardProps {
  title: string;
  value: number;
  vendidos: number;
  restantes: number;
}

const GaugeCard: React.FC<GaugeCardProps> = ({ title, value, vendidos, restantes }) => {
  const [popup, setPopup] = useState<{ visible: boolean; text: string }>({
    visible: false,
    text: '',
  });

  const handleInfoClick = () => {
    setPopup({
      visible: true,
      text: 'Este gráfico mostra a velocidade de vendas, indicando unidades vendidas e restantes.',
    });
  };

  const fecharPopup = () => setPopup({ visible: false, text: '' });

  const meta = 1.0;
  const percentual = Math.min((value / meta) * 100, 100);

  return (
    <div className="gauge-card info-card">
      <div className="gauge-header">
        <div className="gauge-title">{title}</div>
        <Info className="info-btn" size={20} onClick={handleInfoClick} />
      </div>

      <div className="gauge-content">
        <GaugeRadialCustom value={value} vendidos={vendidos} restantes={restantes} />
      </div>

      {popup.visible && (
        <div className="info-popup-overlay" onClick={fecharPopup}>
          <div className="info-popup" onClick={e => e.stopPropagation()}>
            <h4>Informações</h4>
            <p>{popup.text}</p>
            <button onClick={fecharPopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaugeCard;

import React, { useState } from 'react';
import '../../../styles/dashboardPagesStyle/Charts.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { Info } from 'lucide-react';

interface PrecoMedioDataItem {
  cidade: string;
  Privativo: number;
  Construido: number;
}

const data: PrecoMedioDataItem[] = [
  { cidade: 'Recife', Privativo: 6500, Construido: 7200 },
  { cidade: 'Olinda', Privativo: 5800, Construido: 6700 },
  { cidade: 'Paulista', Privativo: 5000, Construido: 6100 },
  { cidade: 'Igarassu', Privativo: 4700, Construido: 5900 },
  { cidade: 'Itapissuma', Privativo: 4300, Construido: 5400 },
];

export default function PrecoMedioChart() {
  const [popup, setPopup] = useState<{ visible: boolean; text: string }>({
    visible: false,
    text: '',
  });

  const handleInfoClick = () => {
    setPopup({
      visible: true,
      text: 'Este gráfico mostra o preço médio do m² por cidade, comparando valores privativos e construídos.',
    });
  };

  const fecharPopup = () => setPopup({ visible: false, text: '' });

  return (
    <div className="card-grafico-preco info-card">
      <h3>Preço Médio do m²</h3>
      <Info className="info-btn" size={20} onClick={handleInfoClick} />

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="cidade" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={20} iconType="circle" />
                 
          <Bar dataKey="Construido" fill="#29306A">
            <LabelList dataKey="Construido" position="top" fill="#29306A" fontSize={12} />
          </Bar>

          <Bar dataKey="Privativo" fill="#32BEF0">
            <LabelList dataKey="Privativo" position="top" fill="#32BEF0" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

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
}

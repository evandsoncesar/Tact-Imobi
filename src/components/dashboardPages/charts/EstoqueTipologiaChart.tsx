import React, { useState } from 'react';
import '../../../styles/dashboardPagesStyle/Charts.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { Info } from 'lucide-react';

interface TipologiaDataItem {
  name: string;
  value: number;
}

const tipologiaData: TipologiaDataItem[] = [
  { name: '1Q', value: 158 },
  { name: '2Q', value: 120 },
  { name: '3Q', value: 270 },
  { name: '4Q ou +', value: 87 },
];

export default function EstoqueTipologiaChart() {
  const [popup, setPopup] = useState<{ visible: boolean; text: string }>({
    visible: false,
    text: '',
  });

  const handleInfoClick = () => {
    setPopup({
      visible: true,
      text: 'Este gráfico mostra a distribuição do estoque por tipologia, ou seja, pelo número de quartos dos imóveis (casas e apartamentos).',
    });
  };

  const fecharPopup = () => setPopup({ visible: false, text: '' });

  // soma total dos valores
  const total = tipologiaData.reduce((acc, item) => acc + item.value, 0);

  // render personalizado para o label que mostra a porcentagem
  const renderPercentLabel = (props: any) => {
    const { x, y, width, value } = props;
    const percent = ((value / total) * 100).toFixed(1); // uma casa decimal
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#29306A"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12}
        fontWeight="bold"
      >
        {percent}%
      </text>
    );
  };

  return (
    <div className="card-grafico-tipologia info-card">
      <h3>Estoque por Tipologia</h3>
      <Info className="info-btn" size={20} onClick={handleInfoClick} />
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={tipologiaData}
          margin={{ top: 30, right: 10, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="name" type="category" />
          <YAxis type="number" />
          <Tooltip />
          <Bar dataKey="value" fill="#29306A">
            <LabelList content={renderPercentLabel} />
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

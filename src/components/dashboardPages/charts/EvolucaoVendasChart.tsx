import React, { useState } from 'react';
import '../../../styles/dashboardPagesStyle/Charts.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList
} from 'recharts';
import { Info } from 'lucide-react';

interface VendasDataItem {
  mes: string;
  Atual: number;
  Media: number;
}

const dataVendas: VendasDataItem[] = [
  { mes: 'Jan', Atual: 40, Media: 30 },
  { mes: 'Fev', Atual: 60, Media: 40 },
  { mes: 'Mar', Atual: 15, Media: 40 },
  { mes: 'Abr', Atual: 60, Media: 45 },
  { mes: 'Mai', Atual: 95, Media: 45 },
  { mes: 'Jun', Atual: 58, Media: 40 },
];

export default function EvolucaoVendasChart() {
  const [popup, setPopup] = useState<{ visible: boolean; text: string }>({
    visible: false,
    text: '',
  });

  const handleInfoClick = () => {
    setPopup({
      visible: true,
      text: 'Este gráfico mostra a evolução das vendas mês a mês, comparando o valor atual com a média histórica.',
    });
  };

  const fecharPopup = () => setPopup({ visible: false, text: '' });

  // Função para renderizar o label customizado
  const renderPercentLabel = (props: any) => {
    const { x, y, value, index } = props;
    const media = dataVendas[index].Media;
    const diff = ((value - media) / media) * 100;
    const arrow = diff >= 0 ? '↑' : '↓';
    const color = diff >= 0 ? '#29306A' : '#f80202ff';

    const labelText = `${arrow} ${Math.abs(diff).toFixed(1)}%`;
    const padding = 11;
    const fontSize = 12;
    const textWidth = labelText.length * (fontSize * 0.6);
    const textHeight = fontSize + padding;

    return (
      <g transform={`translate(${x + 5}, ${y - (-15)})`}>
        <rect
          x={0}
          y={-fontSize}
          width={textWidth + padding}
          height={textHeight}
          fill="#f0efefff"
          rx={6}
          ry={6}
          filter="drop-shadow(0 1px 1px rgba(185, 6, 6, 0.1))"
        />
        <text
          x={padding}
          y={-padding / 2}
          fill={color}
          fontWeight="bold"
          fontSize={fontSize}
          dominantBaseline="hanging"
        >
          {labelText}
        </text>
      </g>
    );
  };

  return (
    <div className="card-grafico-evolucao info-card">
      <h3>Evolução de Vendas</h3>
      <Info className="info-btn" size={20} onClick={handleInfoClick} />

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={dataVendas}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Line
            type="monotone"
            dataKey="Media"
            stroke="#32BEF0"
            strokeWidth={2}
            strokeDasharray="3 1"
          />

          <Line
            type="monotone"
            dataKey="Atual"
            stroke="#29306A"
            strokeWidth={2}
          >
            <LabelList content={renderPercentLabel} />
          </Line>
        </LineChart>
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

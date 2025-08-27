import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  DefaultLegendContent, 
} from 'recharts';
import '../../styles/dashboardPagesStyle/CardVGV.css';
import { Info } from 'lucide-react';

const data = [
  { mes: 'Jan', VGV: 1200000, Projeção: 1100000},
  { mes: 'Fev', VGV: 950000, Projeção: 1200000},
  { mes: 'Mar', VGV: 1550000, Projeção: 1300000},
  { mes: 'Abr', VGV: 1300000, Projeção: 1400000},
  { mes: 'Mai', VGV: 1650000, Projeção: 1500000},
  { mes: 'Jun', VGV: 1900000, Projeção: 1600000},
  { mes: 'Jul', VGV: 1650000, Projeção: 1700000},
  { mes: 'Ago', VGV: 1450000, Projeção: 1800000},
  { mes: 'Set', VGV: 2100000, Projeção: 1900000},
  { mes: 'Out', VGV: 2000000, Projeção: 2000000},
  { mes: 'Nov', VGV: 1800000, Projeção: 2100000},
  { mes: 'Dez', VGV: 2000000, Projeção: 2200000},
];

const CardVGV: React.FC = () => {
  const [popup, setPopup] = useState<{ visible: boolean; text: string }>({
    visible: false,
    text: '',
  });

  const handleInfoClick = () => {
    setPopup({
      visible: true,
      text: 'Este gráfico exibe o VGV mensal e a projeção para cada mês, permitindo acompanhar a evolução financeira.',
    });
  };

  const fecharPopup = () => setPopup({ visible: false, text: '' });

  const renderCustomLegend = (props: any) => {
    if (!props.payload) return null;

    // Força a ordem: VGV primeiro, depois Projeção
    const ordem = ["VGV", "Projeção"];
    const itensOrdenados = [...props.payload].sort(
      (a, b) => ordem.indexOf(a.value) - ordem.indexOf(b.value)
    );

    return (
      <DefaultLegendContent
        {...props}
        payload={itensOrdenados.map((entry) => ({
          ...entry,
          value: (
            <span style={{ color: entry.color }}>
              {entry.value}
            </span>
          ),
        }))}
      />
    );
  };

  return (
    <div className="card-vgv info-card">
      <div className="card-vgv-header">
        <h3 className="card-vgv-title">VGV Mensal (R$)</h3>
        <Info className="info-btn" size={20} onClick={handleInfoClick} />
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis
            dataKey="mes"
            style={{ fontSize: '11px' }}
          />
          <YAxis
            style={{ fontSize: '11px' }}
            domain={[900000, 2100000]}
            tickFormatter={(value) => `R$ ${(value / 1_000_000).toFixed(1)}M`}
          />
          <Tooltip formatter={(value: number) => `R$ ${(value / 1_000_000).toFixed(2)}M`} />
          <Legend
            verticalAlign="bottom"
            align="center"
            content={renderCustomLegend}
            wrapperStyle={{ marginTop: -6 }}
          />

          
          <Line
            type="monotone"
            dataKey="VGV"
            stroke="#29306A"
            strokeWidth={2}
            dot={{ r: 3, stroke: '#29306A', strokeWidth: 1, fill: '#fff' }}
            activeDot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="Projeção"
            stroke="#32BEF0"
            strokeWidth={2}
            strokeDasharray="3 1"
            dot={{ r: 3, stroke: '#32BEF0', strokeWidth: 1, fill: '#fff' }}
            activeDot={{ r: 5 }}
          />

      

        </LineChart>
      </ResponsiveContainer>

      {popup.visible && (
        <div className="info-popup-overlay" onClick={fecharPopup}>
          <div className="info-popup" onClick={(e) => e.stopPropagation()}>
            <h4>Informações</h4>
            <p>{popup.text}</p>
            <button onClick={fecharPopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardVGV;

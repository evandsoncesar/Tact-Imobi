import React, { useState } from 'react';
import '../../../styles/dashboardPagesStyle/Charts.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Info } from 'lucide-react';

interface ProdutoDataItem {
  name: string;
  value: number;
}

const produtoData: ProdutoDataItem[] = [
  { name: 'Lote', value: 50 },
  { name: 'Apartamento', value: 80 },
  { name: 'Casa', value: 100 },
  { name: 'Comercial', value: 80 },
  { name: 'Compacto', value: 40 },
];

const cores: string[] = ['#29306A', '#F55EEB', '#32BEF0', '#1323adff', '#4F65D6', '#FFBB28', '#FF8042'];

// Função para exibir o label externo com porcentagem
const renderCustomizedLabel = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, percent } = props;
  
  const radius = outerRadius + 20; 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y + 2}
      fill="#29306A"
      fontWeight="bold"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export default function EstoqueProdutoChart() {
  const [popup, setPopup] = useState<{ visible: boolean; text: string }>({
    visible: false,
    text: '',
  });

  const handleInfoClick = () => {
    setPopup({
      visible: true,
      text: 'Este gráfico mostra a distribuição do estoque por tipo de produto, com porcentagem de cada categoria em relação ao total.',
    });
  };

  const fecharPopup = () => setPopup({ visible: false, text: '' });

  return (
    <div className="card-grafico-produto info-card">
      <h3>Estoque por Tipo de Produto</h3>
      <Info className="info-btn" size={20} onClick={handleInfoClick} />

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={produtoData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            labelLine={true}
            label={renderCustomizedLabel}
          >
            {produtoData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={30} iconType="circle" />
          <Tooltip />
        </PieChart>
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

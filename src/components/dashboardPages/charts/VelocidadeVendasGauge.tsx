import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

export interface GaugeProps {
  value: number; // de 0 a 100
  size?: number;
  vendidos?: number;   // nova prop
  restantes?: number;  // nova prop
}

const GaugeRadialCustom: React.FC<GaugeProps> = ({ value, size = 200 }) => {
  const cx = size / 2; // centro horizontal
  const cy = size / 2; // centro vertical para que o arco fique centralizado
  const clampedValue = Math.min(Math.max(value, 0), 100);
  const angle = 180 * (clampedValue / 100);

  const RADIAN = Math.PI / 180;
  const needleLength = size / 2.5;
  const needleAngle = 180 - angle;
  const needleX = cx + needleLength * Math.cos(needleAngle * RADIAN);
  const needleY = cy - needleLength * Math.sin(needleAngle * RADIAN);

  // Segmentos coloridos do NPS
  const segments = [
    { value: 50, color: '#FF4C4C' }, // vermelho
    { value: 30, color: '#FFCD00' }, // amarelo
    { value: 20, color: '#4CAF50' }, // verde
  ];
  const data = segments.map(seg => ({ value: seg.value }));

  const outerRadius = size / 2.2;
  const innerRadius = size / 2.8;

  return (
    <div style={{ width: size, height: size * 0.8, textAlign: 'center' }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          startAngle={180}
          endAngle={0}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="value"
          paddingAngle={0}
        >
          {segments.map((seg, index) => (
            <Cell key={index} fill={seg.color} />
          ))}
        </Pie>

        {/* Ponteiro */}
        <g>
          <line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="#29306A"
            strokeWidth={4}
          />
          <circle cx={cx} cy={cy} r={6} fill="#29306A" />
        </g>

        {/* Porcentagem central */}
        <text
          x={cx}
          y={cy + size * 0.15}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={14}
          fill="#29306A"
          fontWeight="bold"
        >
          {Math.round(clampedValue)}%
        </text>

        
      </PieChart>
    </div>
  );
};

export default GaugeRadialCustom;

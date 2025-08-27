import React, { useState } from 'react';
import '../../../styles/dashboardPagesStyle/Charts.css';
import { Info } from 'lucide-react';

interface EstoqueDataItem {
  cidade: string;
  vendidos: number;
  disponiveis: number;
}

const estoqueData: EstoqueDataItem[] = [
  { cidade: 'Recife', vendidos: 40, disponiveis: 45 },
  { cidade: 'Olinda', vendidos: 28, disponiveis: 29 },
  { cidade: 'Ilha de Itamaracá', vendidos: 18, disponiveis: 18 },
  { cidade: 'São Lourenço da Mata', vendidos: 25, disponiveis: 25 },
  { cidade: 'Jaboatão', vendidos: 30, disponiveis: 15 },
  { cidade: 'Camaragibe', vendidos: 20, disponiveis: 10 },
  { cidade: 'Rio Formoso', vendidos: 45, disponiveis: 70 },
  { cidade: 'Gravatá', vendidos: 35, disponiveis: 11 },
  { cidade: 'Tamandaré', vendidos: 20, disponiveis: 34 },
];

export default function EstoqueCidadeChart() {
  const [popup, setPopup] = useState<{ visible: boolean; text: string }>({
    visible: false,
    text: '',
  });

  const handleInfoClick = () => {
    setPopup({
      visible: true,
      text: 'Este gráfico mostra o número de unidades vendidas e disponíveis por localidade. A barra indica a proporção entre vendidos e disponíveis.',
    });
  };

  const fecharPopup = () => {
    setPopup({ visible: false, text: '' });
  };

  return (
    <div className="card-grafico-cidade info-card">
      <h3>Estoque por Localidade</h3>

      <Info
        className="info-btn"
        size={20}
        onClick={handleInfoClick}
      />

      <div className="tabela-cidade">
        <div className="tabela-header">
          <span>#</span>
          <span>Localidade</span>
          <span>Vendas sobre o total</span>
          <span>Disponíveis</span>
          <span>Total</span>
        </div>

        <div className="tabela-body">
          {estoqueData.map((item, index) => {
            const total = item.vendidos + item.disponiveis;
            const vendidosPercent = (item.vendidos / total) * 100;
            const disponiveisPercent = (item.disponiveis / total) * 100;
            const vendidosLabel = `${Math.round(vendidosPercent)}%`;

            const tooltipText = `Vendidos: ${item.vendidos} | Disponíveis: ${item.disponiveis}`;

            return (
              <div className="linha-cidade" key={index}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{item.cidade}</span>

                <div className="barra-vendas-wrapper tooltip-wrapper">
                  <div className="barra-vendas">
                    <div
                      className="vendidos"
                      style={{ width: `${vendidosPercent}%` }}
                    />
                    <div
                      className="disponiveis"
                      style={{ width: `${disponiveisPercent}%` }}
                    />
                  </div>
                  <span className="porcentagem-label">{vendidosLabel}</span>
                  <span className="tooltip">{tooltipText}</span>
                </div>

                <span className="badge">{item.disponiveis}</span>
                <span className="badge total">{total}</span>
              </div>
            );
          })}
        </div>
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
}

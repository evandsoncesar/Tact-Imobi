import React from 'react';
import '../../styles/planosStyle/InfoPlano.css';

const InfoPlano: React.FC = () => {
  return (
    <div className="plano-atual-card">
      <div className="status-label">ATIVO</div>

      <div className="plano-atual-left">
      <div style={{ marginBottom: '8px' }}>
        <p className="titulo">Seu Plano Atual</p>
        <p className="descricao">Gerencie sua assinatura e explore opções de upgrade</p>
        <h3 className="nome-plano">Plano Profissional</h3>
      </div>

        <div className="plano-atual-right">
          <div className="botoes">
            <button className="btn-principal">Entrar em Contato</button>
            <button className="btn-secundario">Gerenciar Assinatura</button>
            <button className="btn-secundario">Suporte Técnico</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPlano;

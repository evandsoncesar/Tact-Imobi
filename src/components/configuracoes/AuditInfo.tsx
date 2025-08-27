import React from 'react';

interface AuditData {
  criadoEm: string;
  ultimaModificacao: string;
  modificadoPor: string;
  status: string;
}

export default function AuditInfo({ data }: { data: AuditData }) {
  return (
    <>
      <hr className="divider" />
      <div className="audit-info">
        <div className="audit-title">Informações de Auditoria</div>
        <div className="audit-grid">
          <div>
            <div className="audit-label">Criado em:</div>
            <div className="audit-value">{data.criadoEm}</div>
          </div>
          <div>
            <div className="audit-label">Última modificação:</div>
            <div className="audit-value">{data.ultimaModificacao}</div>
          </div>
          <div>
            <div className="audit-label">Modificado por:</div>
            <div className="audit-value">{data.modificadoPor}</div>
          </div>
          <div>
            <div className="audit-label">Status:</div>
            <div className={`audit-status ${data.status.toLowerCase() === 'ativo' ? 'ativo' : 'inativo'}`}>
              {data.status}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

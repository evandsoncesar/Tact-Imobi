import React from 'react';
import '../../styles/empreendimentosStyle/PaginacaoEmpreendimentos.css';

export default function PaginacaoEmpreendimentos() {
  return (
    <div className="paginacao-container">
      <button>{'<'}</button>
      <span>Página 1 de 5</span>
      <button>{'>'}</button>
    </div>
  );
}

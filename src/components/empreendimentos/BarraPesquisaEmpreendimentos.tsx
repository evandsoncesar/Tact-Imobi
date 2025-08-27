import React from 'react';
import '../../styles/empreendimentosStyle/BarraPesquisaEmpreendimentos.css';
import { Search } from 'lucide-react';

interface BarraPesquisaProps {
  pesquisa: string;
  onPesquisaChange: (novaPesquisa: string) => void;
}

export default function BarraPesquisaEmpreendimentos({
  pesquisa,
  onPesquisaChange,
}: BarraPesquisaProps) {
  return (
    <div className="barra-pesquisa-container">
      <div className="pesquisa-icon">
        <Search />
      </div>
      <input
        type="text"
        placeholder="Busque por bairro, cidade, tipo..."
        className="barra-pesquisa-input"
        value={pesquisa}
        onChange={(e) => onPesquisaChange(e.target.value)}
      />
      <button className="barra-pesquisa-botao">Buscar</button>
    </div>
  );
}

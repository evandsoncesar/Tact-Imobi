import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from '../components/SideBar';
import BarraPesquisaEmpreendimentos from '../components/empreendimentos/BarraPesquisaEmpreendimentos';
import FiltrosLateraisEmpreendimentos from '../components/empreendimentos/FiltrosLateraisEmpreendimentos';
import ListaEmpreendimentos from '../components/empreendimentos/ListaEmpreendimentos';
import PaginacaoEmpreendimentos from '../components/empreendimentos/PaginacaoEmpreendimentos';
import '../styles/empreendimentosStyle/Empreendimentos.css';
import type { Filtros } from '../components/empreendimentos/Filtros';

export default function Empreendimentos() {
  const [filtros, setFiltros] = useState<Filtros>({
    pesquisa: '',
    estado: '',
    municipio: '',
    precoMin: undefined,
    precoMax: undefined,
    quartos: [],
    suites: [],
    metragemMin: undefined,
    metragemMax: undefined,
    tipoSelecionado: [],
    faseSelecionada: [],
    segmentoSelecionado: [],
  });

  const handleFiltrosChange = useCallback((novosFiltros: Partial<Filtros>) => {
    setFiltros(prev => ({
      ...prev,
      ...novosFiltros,
    }));
  }, []);

  const filtrosSemPesquisa = useMemo(() => {
    const { pesquisa, ...resto } = filtros;
    return resto;
  }, [filtros]);

  return (
    <div className="empreendimentos-container">
      <Sidebar />
      <div className="empreendimentos-content">
        <BarraPesquisaEmpreendimentos
          pesquisa={filtros.pesquisa}
          onPesquisaChange={(novaPesquisa) =>
            setFiltros((prev) => ({ ...prev, pesquisa: novaPesquisa }))
          }
        />
        <div className="empreendimentos-main">
          <FiltrosLateraisEmpreendimentos
            filtros={filtrosSemPesquisa}
            onChange={handleFiltrosChange}
            // passar regiao se tiver
          />
          <div className="empreendimentos-listagem">
            <ListaEmpreendimentos filtros={filtros} />
            <PaginacaoEmpreendimentos />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import '../../styles/empreendimentosStyle/FiltrosLateraisEmpreendimentos.css';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { FiltrosSemPesquisa } from './Filtros';

interface RegiaoItem {
  estado: string;
  municipio: string;
}

interface Props {
  filtros: FiltrosSemPesquisa;
  regiao?: RegiaoItem[];
  onChange: (novosFiltros: Partial<FiltrosSemPesquisa>) => void;
}

const TIPOS = ['Apartamento', 'Casa', 'Lote', 'Flat'];
const FASES = ['Planta', 'Obras', 'Pronto'];
const SEGMENTOS = ['MCMV', 'Baixo', 'Econômico', 'Médio', 'Alto', 'Luxo', 'Alto Luxo'];

const FiltrosLateraisEmpreendimentos: React.FC<Props> = ({ filtros, regiao = [], onChange }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    preco: false,
    quartos: false,
    suites: false,
    metragem: false,
    tipo: false,
    fase: false,
    segmento: false,
  });

  const estadosUnicos = Array.from(new Set(regiao.map(item => item.estado)));
  const municipiosFiltrados = filtros.estado
    ? regiao.filter(item => item.estado === filtros.estado).map(item => item.municipio)
    : [];

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEstadoChange = (estado: string) => {
    onChange({ estado, municipio: '' }); // Limpa município ao mudar estado
  };

  const handleMunicipioChange = (municipio: string) => {
    onChange({ municipio });
  };

  // Funções para alternar valores numéricos e string em arrays de filtros
  const toggleNumero = (valor: number, campo: keyof FiltrosSemPesquisa) => {
    const valoresAtuais = filtros[campo] as number[] | undefined || [];
    const existe = valoresAtuais.includes(valor);
    const novosValores = existe
      ? valoresAtuais.filter(v => v !== valor)
      : [...valoresAtuais, valor];
    onChange({ [campo]: novosValores });
  };

  const toggleString = (valor: string, campo: keyof FiltrosSemPesquisa) => {
    const valoresAtuais = filtros[campo] as string[] | undefined || [];
    const existe = valoresAtuais.includes(valor);
    const novosValores = existe
      ? valoresAtuais.filter(v => v !== valor)
      : [...valoresAtuais, valor];
    onChange({ [campo]: novosValores });
  };

  return (
    <div className="filtros-container">
      <div className="linha-filtros">

        {/* Estado */}
        <div className="dropdown-column">
          <select
          className="dropdown"
          value={filtros.estado || ''}
          onChange={e => handleEstadoChange(e.target.value)}
        >
          <option value="">Selecione o estado</option>
          {estadosUnicos.map(estado => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>

        {/* Município */}
        <select
          className="dropdown"
          value={filtros.municipio || ''}
          onChange={e => handleMunicipioChange(e.target.value)}
          disabled={!filtros.estado}
        >
          <option value="">Selecione o município</option>
          {municipiosFiltrados.map(municipio => (
            <option key={municipio} value={municipio}>{municipio}</option>
          ))}
        </select>
        </div>
        

        {/* Preço */}
        <FiltroRange
          label="Preço"
          expanded={expanded.preco}
          toggle={() => toggleExpand('preco')}
          min={filtros.precoMin}
          max={filtros.precoMax}
          setMin={min => onChange({ precoMin: min })}
          setMax={max => onChange({ precoMax: max })}
        />

        {/* Quartos */}
        <FiltroNumerico
          label="Quartos"
          expanded={expanded.quartos}
          toggle={() => toggleExpand('quartos')}
          valoresSelecionados={filtros.quartos || []}
          setValores={valores => onChange({ quartos: valores })}
          toggleValor={valor => toggleNumero(valor, 'quartos')}
        />

        {/* Suítes */}
        <FiltroNumerico
          label="Suítes"
          expanded={expanded.suites}
          toggle={() => toggleExpand('suites')}
          valoresSelecionados={filtros.suites || []}
          setValores={valores => onChange({ suites: valores })}
          toggleValor={valor => toggleNumero(valor, 'suites')}
        />

        {/* Tipo de Propriedade */}
        <FiltroTexto
          label="Tipo de Propriedade"
          expanded={expanded.tipo}
          toggle={() => toggleExpand('tipo')}
          opcoes={TIPOS}
          selecionados={filtros.tipoSelecionado || []}
          setSelecionados={selecionados => onChange({ tipoSelecionado: selecionados })}
          toggleSelecionado={valor => toggleString(valor, 'tipoSelecionado')}
        />

        {/* Fase do Empreendimento */}
        <FiltroTexto
          label="Fase do Empreendimento"
          expanded={expanded.fase}
          toggle={() => toggleExpand('fase')}
          opcoes={FASES}
          selecionados={filtros.faseSelecionada || []}
          setSelecionados={selecionados => onChange({ faseSelecionada: selecionados })}
          toggleSelecionado={valor => toggleString(valor, 'faseSelecionada')}
        />

        {/* Segmento */}
        <FiltroTexto
          label="Segmento"
          expanded={expanded.segmento}
          toggle={() => toggleExpand('segmento')}
          opcoes={SEGMENTOS}
          selecionados={filtros.segmentoSelecionado || []}
          setSelecionados={selecionados => onChange({ segmentoSelecionado: selecionados })}
          toggleSelecionado={valor => toggleString(valor, 'segmentoSelecionado')}
        />

        {/* Área (m²) */}
        <FiltroRange
          label="Área (m²)"
          expanded={expanded.metragem}
          toggle={() => toggleExpand('metragem')}
          min={filtros.metragemMin}
          max={filtros.metragemMax}
          setMin={min => onChange({ metragemMin: min })}
          setMax={max => onChange({ metragemMax: max })}
        />
      </div>
    </div>
  );
};

// Componentes auxiliares

const FiltroRange = ({
  label,
  expanded,
  toggle,
  min,
  max,
  setMin,
  setMax,
}: {
  label: string;
  expanded: boolean;
  toggle: () => void;
  min?: number;
  max?: number;
  setMin: (val?: number) => void;
  setMax: (val?: number) => void;
}) => (
  <div className="filtro-bloco">
    <span className="label">
      <button className="toggle-btn" onClick={toggle}>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {label}
    </span>
    {expanded && (
      <div className="filtro-inline">
        <input
          type="number"
          placeholder="Mín"
          value={min ?? ''}
          onChange={e => setMin(e.target.value ? Number(e.target.value) : undefined)}
        />
        <input
          type="number"
          placeholder="Máx"
          value={max ?? ''}
          onChange={e => setMax(e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>
    )}
  </div>
);

const FiltroNumerico = ({
  label,
  expanded,
  toggle,
  valoresSelecionados,
  setValores,
  toggleValor,
}: {
  label: string;
  expanded: boolean;
  toggle: () => void;
  valoresSelecionados: number[];
  setValores: (valores: number[]) => void;
  toggleValor: (valor: number) => void;
}) => (
  <div className="filtro-bloco">
    <span className="label">
      <button className="toggle-btn" onClick={toggle}>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {label}
    </span>
    {expanded && (
      <div className="filtro-checkboxes">
        {[1, 2, 3, 4].map(valor => (
          <label key={valor} >
            <input
              type="checkbox"
              checked={valoresSelecionados.includes(valor)}
              onChange={() => toggleValor(valor)}
            />
            {valor === 4 ? '4+' : valor}
          </label>
        ))}
      </div>
    )}
  </div>
);

const FiltroTexto = ({
  label,
  expanded,
  toggle,
  opcoes,
  selecionados,
  setSelecionados,
  toggleSelecionado,
}: {
  label: string;
  expanded: boolean;
  toggle: () => void;
  opcoes: string[];
  selecionados: string[];
  setSelecionados: (selecionados: string[]) => void;
  toggleSelecionado: (valor: string) => void;
}) => (
  <div className="filtro-bloco">
    <span className="label">
      <button className="toggle-btn" onClick={toggle}>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {label}
    </span>
    {expanded && (
      <div className="filtro-checkboxes">
        {opcoes.map(opcao => (
          <label key={opcao} >
            <input
              type="checkbox"
              checked={selecionados.includes(opcao)}
              onChange={() => toggleSelecionado(opcao)}
            />
            {opcao}
          </label>
        ))}
      </div>
    )}
  </div>
);

export default FiltrosLateraisEmpreendimentos;

import React, { useState, useEffect } from 'react';
import '../../styles/mapaStyles/FiltrosMapa.css';
import { ChevronUp, ChevronDown } from 'lucide-react';

export interface RegiaoItem {
  estado: string;
  cidade: string;
  bairro: string;
}

interface FiltrosMapaProps {
  regiao?: RegiaoItem[];
  onFiltrar: (filtros: any) => void;
}

const FiltrosMapa: React.FC<FiltrosMapaProps> = ({ regiao = [], onFiltrar }) => {
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [bairroSelecionado, setBairroSelecionado] = useState('');

  const [cidadesFiltradas, setCidadesFiltradas] = useState<string[]>([]);
  const [bairrosFiltrados, setBairrosFiltrados] = useState<string[]>([]);

  const [tipologias, setTipologias] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);

  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [precoMin, setPrecoMin] = useState('');
  const [precoMax, setPrecoMax] = useState('');
  const [precoM2Min, setPrecoM2Min] = useState('');
  const [precoM2Max, setPrecoM2Max] = useState('');
  const [vendidoMin, setVendidoMin] = useState('');
  const [vendidoMax, setVendidoMax] = useState('');
  const [ivv, setIvv] = useState(50);
  const [vgv, setVgv] = useState(50);

  const [mostrarTipologias, setMostrarTipologias] = useState(false);
  const [mostrarStatus, setMostrarStatus] = useState(false);

  // Novo estado para abrir/fechar filtro
  const [aberto, setAberto] = useState(true);

  const estadosUnicos = [...new Set(regiao.map(item => item.estado))];

  useEffect(() => {
    if (estadoSelecionado) {
      const cidades = [
        ...new Set(
          regiao.filter(item => item.estado === estadoSelecionado).map(item => item.cidade)
        ),
      ];
      setCidadesFiltradas(cidades);
      setCidadeSelecionada('');
      setBairrosFiltrados([]);
      setBairroSelecionado('');
    } else {
      setCidadesFiltradas([]);
      setCidadeSelecionada('');
      setBairrosFiltrados([]);
      setBairroSelecionado('');
    }
  }, [estadoSelecionado, regiao]);

  useEffect(() => {
    if (cidadeSelecionada) {
      const bairros = [
        ...new Set(
          regiao.filter(item => item.cidade === cidadeSelecionada).map(item => item.bairro)
        ),
      ];
      setBairrosFiltrados(bairros);
      setBairroSelecionado('');
    } else {
      setBairrosFiltrados([]);
      setBairroSelecionado('');
    }
  }, [cidadeSelecionada, regiao]);

  const tipologiasDisponiveis = [
    'MCMV', '1 Quarto', '2 Quartos', '3 Quartos', '4 Quartos ou +',
    'Casas', 'Empresarial', 'Loteamento',
  ];

  const statusDisponiveis = ['Planta', 'Obras', 'Pronto'];

  const toggleCheckbox = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const calculaPorcentagem = (valor: number, min: number, max: number) => {
    return ((valor - min) / (max - min)) * 100;
  };

  const handleFiltrar = () => {
    onFiltrar({
      estado: estadoSelecionado,
      cidade: cidadeSelecionada,
      bairro: bairroSelecionado,
      tipologias,
      status,
      areaMin,
      areaMax,
      precoMin,
      precoMax,
      precoM2Min,
      precoM2Max,
      vendidoMin,
      vendidoMax,
      ivv,
      vgv,
    });
  };

  return (
    <div className="filtros-mapa-card">
      {/* Botão hamburguer para abrir/fechar */}
      <div
        className="filtros-toggle"
        onClick={() => setAberto(!aberto)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') setAberto(!aberto) }}
      >
        {aberto ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        <span>{aberto ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
      </div>

      {/* Conteúdo do filtro só aparece se aberto */}
      {aberto && (
        <>
          <div className="linha-filtros">
            <div className="linha-dropdowns">
              <select value={estadoSelecionado} onChange={(e) => setEstadoSelecionado(e.target.value)}>
                <option value="">Selecione o estado</option>
                {estadosUnicos.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>

              <select value={cidadeSelecionada} onChange={(e) => setCidadeSelecionada(e.target.value)} disabled={!estadoSelecionado}>
                <option value="">Selecione a cidade</option>
                {cidadesFiltradas.map((cidade) => (
                  <option key={cidade} value={cidade}>{cidade}</option>
                ))}
              </select>

              <select value={bairroSelecionado} onChange={(e) => setBairroSelecionado(e.target.value)} disabled={!cidadeSelecionada}>
                <option value="">Selecione o bairro</option>
                {bairrosFiltrados.map((bairro) => (
                  <option key={bairro} value={bairro}>{bairro}</option>
                ))}
              </select>
            </div>

            {/* Tipologias */}
            <div className="collapse-group">
              <div className="collapse-header" onClick={() => setMostrarTipologias(!mostrarTipologias)}>
                <span>{mostrarTipologias ? <ChevronUp /> : <ChevronDown />}</span>
                <strong>Tipo do Empreendimento</strong>
              </div>
              {mostrarTipologias && (
                <div className="checkbox-group">
                  {tipologiasDisponiveis.map((tipo) => (
                    <label key={tipo}>
                      <input
                        type="checkbox"
                        checked={tipologias.includes(tipo)}
                        onChange={() => toggleCheckbox(tipo, tipologias, setTipologias)}
                      />
                      {tipo}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div className="collapse-group">
              <div className="collapse-header" onClick={() => setMostrarStatus(!mostrarStatus)}>
                <span>{mostrarStatus ? <ChevronUp /> : <ChevronDown />}</span>
                <strong>Fase do Empreendimento</strong>
              </div>
              {mostrarStatus && (
                <div className="checkbox-group">
                  {statusDisponiveis.map((s) => (
                    <label key={s}>
                      <input
                        type="checkbox"
                        checked={status.includes(s)}
                        onChange={() => toggleCheckbox(s, status, setStatus)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Ranges */}
            <div className="row-ranges">
              <div className="range-group">
                <label>Área (m²):</label>
                <input type="number" placeholder="Mín." value={areaMin} onChange={(e) => setAreaMin(e.target.value)} />
                <input type="number" placeholder="Máx." value={areaMax} onChange={(e) => setAreaMax(e.target.value)} />
              </div>

              <div className="range-group">
                <label>Preço:</label>
                <input type="number" placeholder="Mín." value={precoMin} onChange={(e) => setPrecoMin(e.target.value)} />
                <input type="number" placeholder="Máx." value={precoMax} onChange={(e) => setPrecoMax(e.target.value)} />
              </div>

              <div className="range-group">
                <label>Preço/m²:</label>
                <input type="number" placeholder="Mín." value={precoM2Min} onChange={(e) => setPrecoM2Min(e.target.value)} />
                <input type="number" placeholder="Máx." value={precoM2Max} onChange={(e) => setPrecoM2Max(e.target.value)} />
              </div>

              <div className="range-group">
                <label>% Vendido:</label>
                <input type="number" placeholder="Mín." value={vendidoMin} onChange={(e) => setVendidoMin(e.target.value)} />
                <input type="number" placeholder="Máx." value={vendidoMax} onChange={(e) => setVendidoMax(e.target.value)} />
              </div>
            </div>

            {/* Sliders */}
            <div className="slider-group">
              <label>IVV: {ivv}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={ivv}
                onChange={(e) => setIvv(Number(e.target.value))}
                style={{ '--range-progress': `${calculaPorcentagem(ivv, 0, 100)}%` } as React.CSSProperties}
              />
            </div>

            <div className="slider-group">
              <label>VGV: {vgv} Milhões</label>
              <input
                type="range"
                min={0}
                max={100}
                value={vgv}
                onChange={(e) => setVgv(Number(e.target.value))}
                style={{ '--range-progress': `${calculaPorcentagem(vgv, 0, 100)}%` } as React.CSSProperties}
              />
            </div>
          </div>

          <div className="botao-container">
            <button className="botao-filtrar" onClick={handleFiltrar}>Filtrar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FiltrosMapa;

import React, { useState, useEffect } from 'react';
import '../../styles/socioeconomicoStyle/FiltrosSocio.css';

interface RegiaoItem {
  estado: string;
  municipio: string;
}

interface FiltrosSocioProps {
  regiao?: RegiaoItem[];
  onFiltrar: (filtros: {
    pesquisa: string;
    estado: string;
    municipio: string;
  }) => void;
}

const FiltrosSocio: React.FC<FiltrosSocioProps> = ({ regiao = [], onFiltrar }) => {
  const [pesquisa, setPesquisa] = useState<string>('');
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>('');
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState<string[]>([]);
  const [municipioSelecionado, setMunicipioSelecionado] = useState<string>('');

  const estadosUnicos = [...new Set(regiao.map(item => item.estado))];

  useEffect(() => {
    if (estadoSelecionado) {
      // Remove municípios duplicados usando Set
      const municipios = [
        ...new Set(
          regiao
            .filter(item => item.estado === estadoSelecionado)
            .map(item => item.municipio)
        )
      ];
      setMunicipiosFiltrados(municipios);
      setMunicipioSelecionado('');
    } else {
      setMunicipiosFiltrados([]);
      setMunicipioSelecionado('');
    }
  }, [estadoSelecionado, regiao]);

  const handleFiltrar = () => {
    onFiltrar({
      pesquisa,
      estado: estadoSelecionado,
      municipio: municipioSelecionado,
    });
  };

  return (
    <div className="filtros-card">
      <div className="linha-filtros">
        <input
          type="text"
          className="input-pesquisa"
          placeholder="Pesquisar..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />

        <select
          className="dropdown"
          value={estadoSelecionado}
          onChange={(e) => setEstadoSelecionado(e.target.value)}
        >
          <option value="">Selecione o estado</option>
          {estadosUnicos.map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>

        <select
          className="dropdown"
          value={municipioSelecionado}
          onChange={(e) => setMunicipioSelecionado(e.target.value)}
          disabled={!estadoSelecionado}
        >
          <option value="">Selecione o município</option>
          {municipiosFiltrados.map((municipio) => (
            <option key={municipio} value={municipio}>{municipio}</option>
          ))}
        </select>

        <button className="btn-filtrar" onClick={handleFiltrar}>
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default FiltrosSocio;

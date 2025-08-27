import Sidebar from '../components/SideBar';
import InfoResumo from '../components/socioeconomico/InfoResumo';
import DadosCarrossel from '../components/socioeconomico/DadosCarrossel';
import FiltrosSocio from '../components/socioeconomico/FiltrosSocio';
import '../styles/socioeconomicoStyle/Socioeconomico.css';
import MapaSocioeconomico from '../components/socioeconomico/MapaSocioeconomico';

import { regiao2 } from '../API/api';
import { useState } from 'react';

type Filtros = {
  pesquisa: string;
  estado: string;
  municipio: string;
};

export default function Socioeconomico() {
  const [filtrosAplicados, setFiltrosAplicados] = useState<Filtros | null>(null);

  const handleFiltrar = (filtros: Filtros) => {
    console.log('Filtros aplicados:', filtros);
    setFiltrosAplicados(filtros);
  };

  return (
    <div style={{ display: 'flex', background: '#f5f5f5' }}>
      <Sidebar />
      <div className="socio-container">
        <h2>Dados Socioeconômicos</h2>
        <p>Dados demográficos e socioeconômicos do município.</p>
        <div>
          <FiltrosSocio regiao={regiao2} onFiltrar={handleFiltrar} />
        </div>
        <div>
          <InfoResumo filtros={filtrosAplicados} />
        </div>
        <div className="map-container">
          <MapaSocioeconomico />
        </div>
        <div className="carrossel-container">
          <DadosCarrossel filtros={filtrosAplicados} />
        </div>
      </div>
    </div>
  );
}
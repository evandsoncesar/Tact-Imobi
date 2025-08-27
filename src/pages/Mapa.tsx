import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import FiltrosMapa from '../components/mapas/FiltrosMapa';
import MapaEmpreendimentos from '../components/mapas/MapaEmpreendimentos';
import type { RegiaoItem } from '../components/mapas/FiltrosMapa';

export default function Mapa() {
  const [filtros, setFiltros] = useState<any>(null);

  const handleFiltrar = (novosFiltros: any) => {
    setFiltros(novosFiltros);
  };

  const regioes: RegiaoItem[] = [
    { estado: 'Pernambuco', cidade: 'Recife', bairro: 'Boa Viagem' },
    { estado: 'Pernambuco', cidade: 'Recife', bairro: 'Casa Forte' },
    { estado: 'Pernambuco', cidade: 'Olinda', bairro: 'Bairro Novo' },
  ];

  return (
    <div className="empreendimentos-container" style={{ display: 'flex' }}>
      <Sidebar />

      <div className="conteudo-principal" style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        <FiltrosMapa
          regiao={regioes}
          onFiltrar={handleFiltrar}
        />

        <MapaEmpreendimentos filtros={filtros} />
      </div>
    </div>
  );
}

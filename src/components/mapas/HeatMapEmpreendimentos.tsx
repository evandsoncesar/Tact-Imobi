// HeatMapEmpreendimentos.tsx
import React, { useState, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { LayerProps } from 'react-map-gl';

// Camada de cor nos setores
const choroplethLayer: LayerProps = {
  id: 'setores-choropleth',
  type: 'fill',
  source: 'setores',
  paint: {
      'fill-color': [
      'interpolate',
      ['linear'],
      ['get', 'qtdEmpreendimentos'],
      0, '#fee5d9',
      1, '#fcae91',
      3, '#fb6a4a',
      5, '#de2d26',
      10, '#a50f15'
    ],

    'fill-opacity': 0.7,
    'fill-outline-color': '#333'
  }
};

// Camada de pontos
const pontosLayer: LayerProps = {
  id: 'pontos-empreendimentos',
  type: 'circle',
  source: 'pontos',
  paint: {
    'circle-radius': 6,
    'circle-color': '#ff4d4d',
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

interface HeatMapEmpreendimentosProps {
  filtros: any;
  initialViewState?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export default function HeatMapEmpreendimentos({ filtros, initialViewState }: HeatMapEmpreendimentosProps) {
  const [viewState, setViewState] = useState({
    latitude: initialViewState?.latitude || -8.05,
    longitude: initialViewState?.longitude || -34.9,
    zoom: initialViewState?.zoom || 11,
  });

  const [originalGeojson, setOriginalGeojson] = useState<any>(null);
  const [geojson, setGeojson] = useState<any>(null);
  const [pontosGeojson, setPontosGeojson] = useState<any>(null);

  // 1. Carrega apenas os polígonos
  useEffect(() => {
    fetch('/data/recife.geojson')
      .then(res => res.json())
      .then(data => {
        setOriginalGeojson(data);
      })
      .catch(console.error);
  }, []);

  // 2. Recebe mock/dados do back-end e gera pontos + cores
  useEffect(() => {
    if (!originalGeojson) return;

    const mockEmpreendimentos = [
      { id: '1', latitude: -8.064713364662762, longitude:  -34.89669799009844, bairro: 'Ilha do Leite' },
      { id: '2', latitude: -8.063218575303855,  longitude: -34.90327805360602, bairro: 'Ilha do Retiro' },
      { id: '3', latitude: -8.059113696270503, longitude: -34.88659668979422, bairro: 'Soledade' },
      { id: '4', latitude: -8.059746768266287, longitude: -34.88754760668918, bairro: 'Boa Vista' },
      { id: '5', latitude: -8.054460364211290, longitude: -34.896178274423200, bairro: 'Boa Vista' },
    ];

    // 2.1 Converte pontos em GeoJSON
    const pontosGeojsonData = {
      type: 'FeatureCollection',
      features: mockEmpreendimentos.map(emp => ({
        type: 'Feature',
        properties: { id: emp.id, bairro: emp.bairro },
        geometry: { type: 'Point', coordinates: [emp.longitude, emp.latitude] }
      }))
    };
    setPontosGeojson(pontosGeojsonData);

    // 2.2 Conta empreendimentos por bairro
    const contagemPorBairro: Record<string, number> = {};
    mockEmpreendimentos.forEach(emp => {
      contagemPorBairro[emp.bairro] = (contagemPorBairro[emp.bairro] || 0) + 1;
    });

    // 2.3 Cria um novo GeoJSON só para pintar o mapa (não altera o original)
    const updatedGeojson = {
    ...originalGeojson,
    features: originalGeojson.features.map((feature: any) => {
      const bairroNome = feature.properties['NM_BAIRRO']?.trim();
      const qtd = contagemPorBairro[bairroNome] || 0;
      return {
        ...feature,
        properties: {
          ...feature.properties,
          qtdEmpreendimentos: qtd
        }
      };
    })
  };

    setGeojson(updatedGeojson);
  }, [originalGeojson]);

  console.log(geojson)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        maxWidth: '97.5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoiZXZhbmRzb25jZXNhciIsImEiOiJjbWN3YXNtMjkwMGl2Mm5wd21mdGRlazA0In0.bvgSecEoO0w-PDKVfkcpjQ"
        mapStyle="mapbox://styles/mapbox/light-v10"
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
      >
        {geojson && (
          <Source id="setores" type="geojson" data={geojson}>
            <Layer {...choroplethLayer} />
          </Source>
        )}

        {pontosGeojson && (
          <Source id="pontos" type="geojson" data={pontosGeojson}>
            <Layer {...pontosLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
}

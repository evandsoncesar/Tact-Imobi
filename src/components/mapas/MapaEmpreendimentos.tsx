import React, { useState, useEffect, useRef } from 'react';
import Map, { Source, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
import '../../styles/mapaStyles/MapaEmpreendimentos.css';

import HeatMapEmpreendimentos from './HeatMapEmpreendimentos';

interface Regiao {
  estado: string;
  cidade: string;
  bairro: string;
}

interface Imovel {
  id: string;
  latitude: number;
  longitude: number;
  titulo: string;
  tipo?: string;
  bairro?: string;
  quartos?: number;
  construtora?: string;
  preco?: number;
  unidadesTotais?: number;
  vendidosPercent?: number;
  disponivel?: boolean;
}

interface MapaEmpreendimentosProps {
  filtros: any;
  regiao?: Regiao[];
}

const MapaEmpreendimentos: React.FC<MapaEmpreendimentosProps> = ({ filtros, regiao }) => {
  const [viewState, setViewState] = useState({
    latitude: -8.05,
    longitude: -34.9,
    zoom: 11,
  });

  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [heatmapOn, setHeatmapOn] = useState(false);
  const [imovelSelecionado, setImovelSelecionado] = useState<Imovel | null>(null);
  const navigate = useNavigate();

  const cardRef = useRef<HTMLDivElement>(null);

  // Tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipText, setTooltipText] = useState('');

  useEffect(() => {
    const mockImoveis: Imovel[] = [
      {
        id: '1',
        latitude: -8.059113696270503,
        longitude: -34.88659668979422,
        titulo: 'Condomínio Pinheiros',
        tipo: 'Apartamento',
        bairro: 'Pinheiros',
        quartos: 2,
        construtora: 'Construtora Theta',
        preco: 680000,
        unidadesTotais: 180,
        vendidosPercent: 38,
        disponivel: true,
      },
      { id: '2', latitude: -8.06, longitude: -34.92, titulo: 'Imóvel 2' },
      { id: '3', latitude: -8.03, longitude: -34.88, titulo: 'Imóvel 3' },
    ];
    setImoveis(mockImoveis);
  }, []);

  function handleProgressMouseMove(e: React.MouseEvent<HTMLDivElement>, imovel: Imovel) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setTooltipLeft(x);

    const unidades = imovel.unidadesTotais ?? 0;
    const percent = imovel.vendidosPercent ?? 0;
    const vendidas = Math.round((unidades * percent) / 100) || 0;
    const disponiveis = unidades - vendidas;
    setTooltipText(`Vendidas: ${vendidas} | Disponíveis: ${disponiveis}`);
  }

  return (
    <div className="mapa-root">
      {/* Botão Heatmap */}
      <div className="mapa-heatmap-toggle">
        <label>
          <input
            type="checkbox"
            checked={heatmapOn}
            onChange={() => setHeatmapOn(!heatmapOn)}
          />{' '}
          Mostrar Heatmap
        </label>
      </div>

      {heatmapOn ? (
        <HeatMapEmpreendimentos filtros={filtros} initialViewState={viewState} />
      ) : (
        <div className="mapa-container">
          <Map
            {...viewState}
            mapboxAccessToken="pk.eyJ1IjoiZXZhbmRzb25jZXNhciIsImEiOiJjbWN3YXNtMjkwMGl2Mm5wd21mdGRlazA0In0.bvgSecEoO0w-PDKVfkcpjQ"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onMove={(evt) => setViewState(evt.viewState)}
            style={{ width: '100%', height: '100%' }}
          >
            <Source
              id="imoveis"
              type="geojson"
              data={{
                type: 'FeatureCollection',
                features: imoveis.map((imovel) => ({
                  type: 'Feature',
                  properties: { id: imovel.id, title: imovel.titulo },
                  geometry: { type: 'Point', coordinates: [imovel.longitude, imovel.latitude] },
                })),
              }}
            />

            {imoveis.map((imovel) => (
              <Marker
                key={imovel.id}
                longitude={imovel.longitude}
                latitude={imovel.latitude}
                anchor="bottom"
              >
                <div
                  title={imovel.titulo}
                  style={{ display: 'inline-block', cursor: 'pointer' }}
                  onClick={() => setImovelSelecionado(imovel)}
                >
                  <MapPin
                    size={22}
                    color="white"
                    style={{
                      border: '2px solid #29306a',
                      borderRadius: '50%',
                      backgroundColor: '#29306a',
                      padding: '2px',
                    }}
                  />
                </div>
              </Marker>
            ))}
          </Map>

          {imovelSelecionado && (
            <Draggable nodeRef={cardRef} bounds="parent">
              <div ref={cardRef} className="mapa-info-card" role="dialog" aria-label="Informações do empreendimento">
                <div className="mapa-info-header">
                  <h3 className="mapa-info-title">{imovelSelecionado.titulo}</h3>
                  <button className="mapa-close-btn" onClick={() => setImovelSelecionado(null)}>×</button>
                </div>

                <ul className="mapa-info-list">
                  <li><strong>Construtora:</strong> {imovelSelecionado.construtora || '—'}</li>
                  <li><strong>Bairro:</strong> {imovelSelecionado.bairro || '—'}</li>
                  <li><strong>Tipo:</strong> {imovelSelecionado.tipo || '—'}</li>
                  <li><strong>Quartos:</strong> {imovelSelecionado.quartos ?? '—'}</li>
                </ul>

                <div className="mapa-price-row">
                  <strong>R$ {imovelSelecionado.preco?.toLocaleString('pt-BR') || '—'}</strong>
                  <span
                    className="mapa-status-pill"
                    style={{
                      backgroundColor:
                        imovelSelecionado.vendidosPercent === 100
                          ? '#ff4d4f' // vermelho para esgotado
                          : imovelSelecionado.disponivel
                          ? '#44c3ff' // azul para disponível
                          : '#999',   // cinza para indisponível
                    }}
                  >
                    {imovelSelecionado.vendidosPercent === 100
                      ? 'Esgotado'
                      : imovelSelecionado.disponivel
                      ? 'Disponível'
                      : 'Indisponível'}
                  </span>
                </div>

                <div className="mapa-units-row">
                  <small className="mapa-units-total">
                    {imovelSelecionado.unidadesTotais ? `${imovelSelecionado.unidadesTotais} unidades totais` : ''}
                  </small>
                  <div className="mapa-percent-sold">
                    {imovelSelecionado.vendidosPercent !== undefined && imovelSelecionado.vendidosPercent !== null
                      ? `${imovelSelecionado.vendidosPercent}% vendido`
                      : '—'}
                  </div>
                </div>

                {imovelSelecionado.unidadesTotais !== undefined && (
                  <div
                    className="mapa-progress-bar"
                    onMouseMove={(e) => handleProgressMouseMove(e, imovelSelecionado)}
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                  >
                    <div
                      className="mapa-progress-fill"
                      style={{ width: `${imovelSelecionado.vendidosPercent || 0}%` }}
                    />
                    <div
                      className={`mapa-tooltip ${tooltipVisible ? 'visible' : ''}`}
                      style={{ left: `${tooltipLeft}px` }}
                    >
                      {tooltipText}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate(`/empreendimentos/${imovelSelecionado.id}`)}
                  className="mapa-goto-btn"
                >
                  Ir para empreendimento
                </button>
              </div>
            </Draggable>
          )}
        </div>
      )}
    </div>
  );
};

export default MapaEmpreendimentos;

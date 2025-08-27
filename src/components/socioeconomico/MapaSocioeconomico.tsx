import React, { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { LayerProps } from "react-map-gl";

const choroplethLayer: LayerProps = {
   id: "municipios-populacao",
  type: "fill",
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      // Correção: Converte a propriedade para número antes de interpolar
      ["to-number", ["get", "Agregados_por_setores_demografia_BR_V01006"]],
      // Seus valores de parada. Você pode ajustá-los para corresponder melhor aos seus dados.
      // Por exemplo, os primeiros valores no seu GeoJSON são 394, 774, 643, etc.
      180,
      "#d4f0a0", // Verde claro
      300,
      "#a2d66c",
      500,
      "#f0e68c", // Amarelo
      700,
      "#ffa500", // Laranja
      900,
      "#ff4500", // Vermelho alaranjado
      1100,
      "#8b0000", // Vermelho escuro
    ],
    "fill-opacity": 0.7,
    "fill-outline-color": "#333",
  },
};

export default function MapaSocioeconomico() {
  const [viewState, setViewState] = useState({
    longitude: -34.75,
    latitude: -7.15,
    zoom: 10.7,
  });

  const [geojson, setGeojson] = useState<any>(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/João Pessoa.geojson") // <-- Caminho correto
      .then((res) => res.json())
      .then((data) => {
        console.log("GeoJSON carregado:", data);
        setGeojson(data);
      })
      .catch((err) => console.error("Erro ao carregar GeoJSON:", err));
  }, []);

  return (
    <div style={{ width: "150%", height: "70vh" }}>
      <Map
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoiZXZhbmRzb25jZXNhciIsImEiOiJjbWN3YXNtMjkwMGl2Mm5wd21mdGRlazA0In0.bvgSecEoO0w-PDKVfkcpjQ"
        mapStyle="mapbox://styles/mapbox/light-v10"
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
      >
        {geojson && (
          <Source id="municipios" type="geojson" data={geojson}>
            <Layer {...choroplethLayer} />
          </Source>
        )}
      </Map>
    </div>
  );
}

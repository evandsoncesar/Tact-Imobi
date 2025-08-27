import React, { useState, useEffect } from "react";
import "../../styles/socioeconomicoStyle/InfoResumo.css";
import {
  UsersRound,
  LandPlot,
  TrendingUp,
  MapPin,
  CircleDollarSign,
  HandCoins,
  Info,
} from "lucide-react";

interface InfoCard {
  titulo: string;
  valor: string;
  icone: React.ReactElement;
  descricao: string;
}

interface FiltrosProps {
  filtros: {
    pesquisa: string;
    estado: string;
    municipio: string;
  } | null;
}

const dadosPorMunicipio: Record<string, InfoCard[]> = {
  "São Paulo": [
    {
      titulo: "População Total",
      valor: "12.325.232 Hab.",
      icone: <UsersRound />,
      descricao: "Número total de habitantes do município.",
    },
    {
      titulo: "Área Total",
      valor: "1.521 km²",
      icone: <LandPlot />,
      descricao: "Tamanho total da área geográfica da cidade.",
    },
    {
      titulo: "IDH",
      valor: "0,805",
      icone: <TrendingUp />,
      descricao: "Índice de Desenvolvimento Humano.",
    },
    {
      titulo: "PIB (Milhões)",
      valor: "R$ 803.000,00",
      icone: <CircleDollarSign />,
      descricao: "Produto Interno Bruto total.",
    },
    {
      titulo: "PIB per capita",
      valor: "R$ 65.000,00",
      icone: <MapPin />,
      descricao: "PIB dividido pela população.",
    },
    {
      titulo: "Pop. Economicamente Ativa",
      valor: "6.000.000 (49%)",
      icone: <HandCoins />,
      descricao: "População ativa empregada.",
    },
  ],
  "João Pessoa": [
    {
      titulo: "População Total",
      valor: "888.232 Hab.",
      icone: <UsersRound />,
      descricao: "Número total de habitantes do município.",
    },
    {
      titulo: "Área Total",
      valor: "210 km²",
      icone: <LandPlot />,
      descricao: "Tamanho total da área geográfica da cidade.",
    },
    {
      titulo: "IDH",
      valor: "0,763",
      icone: <TrendingUp />,
      descricao: "Índice de Desenvolvimento Humano.",
    },
    {
      titulo: "PIB (Milhões)",
      valor: "R$ 22.000,00",
      icone: <CircleDollarSign />,
      descricao: "Produto Interno Bruto total.",
    },
    {
      titulo: "PIB per capita",
      valor: "R$ 27.000,00",
      icone: <MapPin />,
      descricao: "PIB dividido pela população.",
    },
    {
      titulo: "Pop. Economicamente Ativa",
      valor: "514.000 (57%)",
      icone: <HandCoins />,
      descricao: "População ativa empregada.",
    },
  ],
};

const InfoResumo: React.FC<FiltrosProps> = ({ filtros }) => {
  const [cards, setCards] = useState<InfoCard[]>([]);
  const [popup, setPopup] = useState<{ visible: boolean; label: string }>({
    visible: false,
    label: "",
  });

  useEffect(() => {
    if (filtros && filtros.municipio) {
      const dados = dadosPorMunicipio[filtros.municipio] || [];
      setCards(dados);
    } else {
      setCards([]);
    }
  }, [filtros]);

  const handleInfoClick = (descricao: string) => {
    setPopup({
      visible: true,
      label: descricao,
    });
  };

  const fecharPopup = () => {
    setPopup({ visible: false, label: "" });
  };

  if (!filtros || !filtros.municipio) {
    return (
      <p className="info-msg">Selecione um município para ver os dados.</p>
    );
  }

  return (
    <div className="info-resumo-container">
      {cards.length > 0 ? (
        cards.map((item, index) => (
          <div key={index} className="info-box">
            <div
              className="info-tooltip-wrapper"
              onClick={() => handleInfoClick(item.descricao)}
            >
              <Info className="info-icon-top" />
            </div>
            <div className="info-text">
              <h4>{item.titulo}</h4>
              <p>{item.valor}</p>
            </div>
            <div className="info-icon">
              <div className="icon-circle">{item.icone}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="info-msg">Nenhum dado disponível para esse município.</p>
      )}

      {/* Pop-up de explicação (mesmo estilo do DadosCarrossel) */}
      {popup.visible && (
        <div className="info-popup-overlay" onClick={fecharPopup}>
          <div className="info-popup" onClick={(e) => e.stopPropagation()}>
            <h4>Explicação</h4>
            <p>{popup.label}</p>
            <button onClick={fecharPopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoResumo;

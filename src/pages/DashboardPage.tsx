import React from "react";
import Sidebar from "../components/SideBar";
import CardIndicator from "../components/dashboardPages/CardIndicator";
import CardIndicatorSecondary from "../components/dashboardPages/CardIndicatorSecondary";
import CardVSO from "../components/dashboardPages/CardVSO";
import CardVGV from "../components/dashboardPages/CardVGV";
import {
  MapPin,
  Building2,
  Building,
  Globe,
  Hammer,
  BriefcaseBusiness,
} from "lucide-react";

import PrecoMedioChart from "../components/dashboardPages/charts/PrecoMedioChart";
import EvolucaoVendasChart from "../components/dashboardPages/charts/EvolucaoVendasChart";
import GaugeCard from "../components/dashboardPages/charts/GaugeCArd"; // corrigido "GaugeCard"
import EstoqueCidadeChart from "../components/dashboardPages/charts/EstoqueCidadeChart";
import EstoqueTipologiaChart from "../components/dashboardPages/charts/EstoqueTipologiaChart";
import EstoqueProdutoChart from "../components/dashboardPages/charts/EstoqueProdutoChart";

import "../styles/dashboardPagesStyle/CardIndicatorSecondary.css";
import "../styles/dashboardPagesStyle/CardIndicator.css";
import "../styles/dashboardPagesStyle/CardVSO.css";
import "../styles/dashboardPagesStyle/DashboardPage.css";
import "../styles/dashboardPagesStyle/Charts.css";
import "../styles/dashboardPagesStyle/CardVGV.css";

interface Indicador {
  title: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
}

const indicadores: Indicador[] = [
  { title: "DÓLAR", value: "R$5,72" },
  { title: "IPCA", value: "4,83%" },
  { title: "INCC", value: "0,51%" },
  { title: "SELIC", value: "15,00%" },
  { title: "Cidades Mapeadas", value: "14", icon: <MapPin size={"1.4vw"} /> },
  { title: "Unidades", value: "85k", icon: <Building size={"1.4vw"} /> },
  { title: "Construtoras", value: "32", icon: <Hammer size={"1.4vw"} /> },
  {
    title: "Empreendimentos",
    value: "15k",
    icon: <Building2 size={"1.4vw"} />,
  },
  { title: "VSO", value: "10%", icon: <BriefcaseBusiness size={"1.4vw"} /> },
];

export default function DashboardPage() {
  const velocidadeDeVendas = 75;
  const numeroVendidos = 45.621;
  const numeroRestantes = 400;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          padding: 20,
          background: "#f5f5f5",
          minHeight: "100vh",
          flex: 1,
        }}
      >
        <div className="dashboard-conteudo">
          {/* Bloco Esquerdo */}
          <div className="dashboard-esquerda">
            {/* Indicadores de Mercado */}
            <div className="indicadores-mercado">
              <div className="indicadores-container">
                <div className="indicadores-header">
                  <Globe />
                  <span>Indicadores de</span>
                  <span>de Mercado</span>
                </div>
                <div className="indicadores-grid">
                  {indicadores.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <CardIndicator
                        value={item.value}
                        icon={item.icon}
                        color="#29306A"
                        title=""
                      />
                      <div className="indicador-titulo">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Indicadores Secundários */}
            <div className="indicadores-secundarios">
              <div className="indicadores-grid-secondary">
                {indicadores.slice(4).map((item, index) => (
                  <CardIndicatorSecondary
                    key={index + 4}
                    value={item.value}
                    title={item.title}
                    icon={item.icon}
                    color={item.color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bloco Direito */}
          <div className="dashboard-direita">
            <GaugeCard
              title="Índice de Velocidade de Vendas (IVV)"
              value={velocidadeDeVendas}
              vendidos={numeroVendidos}
              restantes={numeroRestantes}
            />
          </div>
        </div>

        <div className="graficos-principais">
          <div className="grafico">
            <PrecoMedioChart />
          </div>
          <div className="grafico">
            <EvolucaoVendasChart />
          </div>
        </div>
        <div className="graficos-principais">
          <div className="grafico-secundarios">
            <CardVGV />
          </div>
          <div className="grafico-secundarios">
            <EstoqueProdutoChart />
          </div>
          <div className="grafico-secundarios">
            <EstoqueTipologiaChart />
          </div>
        </div>
        <div>
          <EstoqueCidadeChart />
        </div>
      </div>
    </div>
  );
}

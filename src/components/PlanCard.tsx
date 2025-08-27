import React from "react";
import "../styles/SideBar.css";
import { useNavigate } from "react-router-dom";

const PlanCard: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/planos");
  };

  return (
    <div className="plan-card">
      <img
        src={process.env.PUBLIC_URL + "/Logo2.png"}
        alt="Tact Imobi"
        className="plan-card-logo"
      />
      <h3 className="plan-card-title">Tact Imobi</h3>
      <p className="plan-card-subtitle">Garanta acesso a mais cidades.</p>
      <button className="plan-card-button" onClick={handleClick}>
        Alterar Plano
      </button>
    </div>
  );
};

export default PlanCard;

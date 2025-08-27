import React from "react";
import "../styles/loginStyle/Login.css";
import LoginForm from "../components/login/LoginForm";

export default function Login() {
  return (
    <div className="login-wrapper">
      {/* Fundo branco com mapa */}
      <img src= {process.env.PUBLIC_URL + "/background-cidade.svg"} alt="background" className="login-bg" />

      {/* Conteúdo principal */}
      <div className="login-container">
        <div className="login-left">
          <img src={process.env.PUBLIC_URL + "/logotact.svg"} alt="Logo" className="login-logo" />
          <p className="login-text">
            Dados que transformam<br />
            Estratégias que se conectam
          </p>
          <LoginForm />
        </div>

        <div className="login-right">
          <img src= {process.env.PUBLIC_URL + "/polygono-cidade.svg"} alt="Polygon" className="login-polygon" />
        </div>
      </div>
    </div>
  );
}

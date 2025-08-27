import React from "react";
import "../styles/loginStyle/Login.css";
import EsqueciSenhaForm from "../components/esqueciSenha/esqueciSenhaForm";

export default function Login() {
  return (
    <div className="login-wrapper">
      {/* Fundo branco com mapa */}
      <img src= {process.env.PUBLIC_URL + "/background-cidade.svg"} alt="background" className="login-bg" />

      {/* Conteúdo principal */}
      <div className="login-container">
        <div className="login-left">
          <img src={process.env.PUBLIC_URL + "/logotact.svg"} alt="Logo" className="login-logo" />
          <p className="login-title">
            Redefinição de Senha
          </p>
          <p className="login-text">
            Informe o e-mail registrado e enviaremos<br />
            um link para recuperação de sua senha.
          </p>
          <EsqueciSenhaForm />
        </div>

        <div className="login-right">
          <img src={process.env.PUBLIC_URL + "/polygono-cidade.svg"} alt="Polygon" className="login-polygon" />
        </div>
      </div>
    </div>
  );
}

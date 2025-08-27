import { HashRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import DashboardDetails from "./pages/DashboardDetails";
import Socioeconomico from "./pages/Socioeconomico";
import Empreendimentos from "./pages/Empreendimentos";
import Mapa from "./pages/Mapa";
import Planos from "./pages/Planos";
import Configuracoes from "./pages/Configuracoes";
import DetalhesEmpreendimento from "./pages/DetalhesEmpreendimento";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/EsqueciSenha";
import Cadastro from "./pages/Cadastro";
import { JSX } from "react";

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboarddetails" element={<DashboardDetails />} />
        <Route path="/socioeconomico" element={<Socioeconomico />} />
        <Route path="/empreendimentos" element={<Empreendimentos />} />
        <Route
          path="/empreendimentos/:id"
          element={<DetalhesEmpreendimento />}
        />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;

import Sidebar from "../components/SideBar";
import "../styles/configuracoesStyle/Configuracoes.css";
import { User } from "lucide-react";
import React, { useState, useEffect, FormEvent } from "react";

import UserForm from "../components/configuracoes/UserForm";
import EmployeeList from "../components/configuracoes/EmployeeList";
import AuditInfo from "../components/configuracoes/AuditInfo";
import LogoutButton from "../components/configuracoes/LogoutButton";

interface Employee {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
}

interface UserData {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  role: "funcionario" | "admin";
}

export default function Configuracoes() {
  const [role, setRole] = useState<"funcionario" | "admin" | null>(null);

  // 🔹 Estados do usuário logado (informações pessoais)
  const [userNome, setUserNome] = useState("");
  const [userSenha, setUserSenha] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userEmpresa, setUserEmpresa] = useState("");
  const [userCargo, setUserCargo] = useState("");

  // Lista de funcionários
  const [funcionarios, setFuncionarios] = useState<Employee[]>([]);

  // 🔹 Estados para edição/adicionar funcionário
  const [funcNome, setFuncNome] = useState("");
  const [funcSenha, setFuncSenha] = useState("");
  const [funcEmail, setFuncEmail] = useState("");
  const [funcEmpresa, setFuncEmpresa] = useState("");
  const [funcCargo, setFuncCargo] = useState("");

  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const auditData = {
    criadoEm: "15/01/2024 às 14:30",
    ultimaModificacao: "07/01/2025 às 16:45",
    modificadoPor: "João Silva Santos",
    status: "Ativo",
  };

  useEffect(() => {
    // Simulação de dados do usuário (substitui a chamada da API)
    const data: UserData = {
      nome: "Bruno Cantalupo",
      email: "Cantalupo@bcb.com",
      empresa: "BCB Inteligência",
      cargo: "Analista",
      role: "admin", // mude para 'funcionario' para testar a visão do funcionário
    };

    // Preencher estados
    setUserNome(data.nome);
    setUserEmail(data.email);
    setUserEmpresa(data.empresa);
    setUserCargo(data.cargo);
    setRole(data.role);

    // Simulação de funcionários (opcional, só para visualizar)
    setFuncionarios([
      {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        empresa: "Empresa X",
        cargo: "Analista",
      },
      {
        id: 2,
        nome: "Maria Souza",
        email: "maria@email.com",
        empresa: "Empresa X",
        cargo: "Desenvolvedora",
      },
    ]);
  }, []);

  // Salvar dados do usuário
  const handleSaveUser = (e: FormEvent) => {
    e.preventDefault();
    alert(`Dados pessoais salvos!`);
  };

  // Salvar funcionário
  const handleSaveEmployee = (e: FormEvent) => {
    e.preventDefault();
    const funcionario: Employee = {
      id: editingEmployee?.id ?? Date.now(),
      nome: funcNome,
      email: funcEmail,
      empresa: funcEmpresa,
      cargo: funcCargo,
    };

    if (editingEmployee) {
      setFuncionarios((prev) =>
        prev.map((f) => (f.id === editingEmployee.id ? funcionario : f))
      );
    } else {
      setFuncionarios((prev) => [...prev, funcionario]);
    }

    setShowEmployeeForm(false);
    setEditingEmployee(null);
    setFuncNome("");
    setFuncEmail("");
    setFuncEmpresa("");
    setFuncCargo("");
    setFuncSenha("");
  };

  const handleEditEmployee = (id: number) => {
    const emp = funcionarios.find((f) => f.id === id);
    if (emp) {
      setEditingEmployee(emp);
      setFuncNome(emp.nome);
      setFuncEmail(emp.email);
      setFuncEmpresa(emp.empresa);
      setFuncCargo(emp.cargo);
      setFuncSenha("");
      setShowEmployeeForm(true);
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFuncNome("");
    setFuncEmail("");
    setFuncEmpresa("");
    setFuncCargo("");
    setFuncSenha("");
    setShowEmployeeForm(true);
  };

  // 🔹 Enquanto não carregar role, mostra loader ou nada
  if (!role) return <div>Carregando...</div>;

  return (
    <div style={{ display: "flex", background: "#f5f5f5" }}>
      <Sidebar />
      <div className="config-container">
        <div className="config-row">
          <h2>Configurações</h2>
          <LogoutButton />
        </div>
        <p>Gerencie as suas configurações de cadastro interno.</p>
        <div className="config-card">
          <div className="card-header">
            <User className="card-icon" />
            <h3 className="card-title">Informações Pessoais</h3>
          </div>

          <form onSubmit={handleSaveUser}>
            <UserForm
              nome={userNome}
              setNome={setUserNome}
              senha={userSenha}
              setSenha={setUserSenha}
              email={userEmail}
              setEmail={setUserEmail}
              empresa={userEmpresa}
              setEmpresa={setUserEmpresa}
              cargo={userCargo}
              setCargo={setUserCargo}
              role={role}
            />
            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                Salvar
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => alert("Alterações canceladas")}
              >
                Cancelar
              </button>
            </div>
          </form>

          <AuditInfo data={auditData} />

          {role === "admin" && (
            <>
              {!showEmployeeForm && (
                <EmployeeList
                  funcionarios={funcionarios}
                  onEdit={handleEditEmployee}
                  onDelete={(id) =>
                    setFuncionarios((prev) => prev.filter((f) => f.id !== id))
                  }
                  onAdd={handleAddEmployee}
                />
              )}

              {showEmployeeForm && (
                <form onSubmit={handleSaveEmployee}>
                  <UserForm
                    nome={funcNome}
                    setNome={setFuncNome}
                    senha={funcSenha}
                    setSenha={setFuncSenha}
                    email={funcEmail}
                    setEmail={setFuncEmail}
                    empresa={funcEmpresa}
                    setEmpresa={setFuncEmpresa}
                    cargo={funcCargo}
                    setCargo={setFuncCargo}
                    role={role}
                  />
                  <div className="form-buttons">
                    <button type="submit" className="btn-submit">
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => {
                        setShowEmployeeForm(false);
                        setEditingEmployee(null);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { ChangeEvent } from 'react';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import SelectInput from './SelectInput'; 

interface UserFormProps {
  nome: string;
  setNome: (v: string) => void;
  senha: string;
  setSenha: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  empresa: string;
  setEmpresa: (v: string) => void;
  cargo: string;
  setCargo: (v: string) => void;
  role: 'funcionario' | 'admin';
  children?: React.ReactNode; // 👈 agora aceita children
}

const cargosDisponiveis = ['Analista', 'Desenvolvedor', 'Gerente', 'Designer', 'Coordenador'];

export default function UserForm({
  nome, setNome,
  senha, setSenha,
  email, setEmail,
  empresa, setEmpresa,
  cargo, setCargo,
  role,
  children,
}: UserFormProps) {
  const isFuncionario = role === 'funcionario';

  return (
    <>
     <div className="form-container"> 
        <TextInput
          label="Nome"
          value={nome}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
        />

        <EmailInput
          label="E-mail"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Senha"
          value={senha}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
        />

        <TextInput
          label="Empresa"
          value={empresa}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmpresa(e.target.value)}
          disabled={isFuncionario}
        />
        {/* Substituído por SelectInput */}
        <SelectInput
          label="Cargo/Função"
          value={cargo}
          onChange={setCargo}
          options={cargosDisponiveis}
          disabled={isFuncionario}
        />
     </div>

      {/* Se houver children, renderiza aqui */}
      {children && <div className="form-extra">{children}</div>}
    </>
  );
}

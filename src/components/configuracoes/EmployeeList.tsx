import React from 'react';
import Button from './Button';

interface Employee {
  id: number;
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
}

export interface EmployeeListProps {
  funcionarios: Employee[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void; // ⚠️ Adicionar aqui
}

export default function EmployeeList({
  funcionarios,
  onEdit,
  onDelete,
  onAdd,
}: EmployeeListProps) {
  return (
    <div className="employee-list">
      <h3>Funcionários</h3>
      <button className="btn" onClick={onAdd}>Adicionar Funcionário</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Empresa</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id}>
              <td>{f.nome}</td>
              <td>{f.email}</td>
              <td>{f.empresa}</td>
              <td>{f.cargo}</td>
              <td>
                <button className="btn" onClick={() => onEdit(f.id)}>Editar</button>
                <button className="btn" onClick={() => onDelete(f.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


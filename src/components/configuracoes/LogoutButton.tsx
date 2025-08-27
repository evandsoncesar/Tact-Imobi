import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você pode limpar o token/autenticação
    localStorage.removeItem("authToken"); 
    sessionStorage.clear();

    // Redireciona para a página de login
    navigate("/login");
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Button label="Logout" onClick={handleLogout} />
    </div>
  );
}

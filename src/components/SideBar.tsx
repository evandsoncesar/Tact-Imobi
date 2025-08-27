import React, { useEffect, useState } from 'react';
import {
  ChartPie,
  ChartColumn,
  Building,
  Map,
  ChartLine,
  Cog,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import PlanCard from './PlanCard';
import '../styles/SideBar.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
    document.body.classList.toggle('sidebar-collapsed', isCollapsed);
  }, [isCollapsed]);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  const menuItems = [
    { to: '/', icon: <ChartPie />, text: 'Home' },
    { to: '/dashboarddetails', icon: <ChartColumn />, text: 'Dashboard' },
    { to: '/socioeconomico', icon: <ChartLine />, text: 'Socioeconômico' },
    { to: '/empreendimentos', icon: <Building />, text: 'Empreendimentos' },
    { to: '/mapa', icon: <Map />, text: 'Mapa' },
    { to: '/configuracoes', icon: <Cog />, text: 'Configurações' },
  ];

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <span className="hamburger-icon">&#9776;</span>
      </button>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="logo-container" onClick={toggleCollapse}>
          <img
            src= {process.env.PUBLIC_URL + "/logo.png"}
            alt="Logo"
            className={`sidebar-logo ${isCollapsed ? 'collapsed-logo' : ''}`}
          />
        </div>

        <div className="sidebar-inner">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              data-tooltip={item.text}
              className={({ isActive }) =>
                `menu-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && <span className="menu-text">{item.text}</span>}
            </NavLink>
          ))}
        </div>

        {!isCollapsed && (
          <div className="plan-card-inner">
            <PlanCard />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;

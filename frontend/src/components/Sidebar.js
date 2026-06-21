import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/pacientes', label: 'Pacientes', icon: '👤' },
    { path: '/agendamentos', label: 'Agendamentos', icon: '📅' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>SGAM</h2>
        <span className="subtitle">Gestão Médica</span>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-info">
          <span className="user-name">{user.username}</span>
          <span className="user-role">{user.role}</span>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </div>
    </aside>
  );
}

export default Sidebar;

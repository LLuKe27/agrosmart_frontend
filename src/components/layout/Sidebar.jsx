import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PawPrint,
  Milk,
  DollarSign,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/animais', label: 'Animais', icon: PawPrint },
  { path: '/producao', label: 'Produção', icon: Milk },
  { path: '/despesas', label: 'Financeiro', icon: DollarSign },
  { path: '/funcionarios', label: 'Funcionários', icon: Users },
  { path: '/relatorios', label: 'Relatórios', icon: BarChart3 },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {expanded && (
        <div
          className="sidebar-overlay"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${expanded ? 'sidebar--expanded' : ''}`}>
        {/* Logo */}
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <Leaf size={24} />
          </div>
          {expanded && (
            <span className="sidebar__logo-text">AgroSmart</span>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav" aria-label="Navegação principal">
          <ul className="sidebar__nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
                    title={item.label}
                    onClick={() => {
                      if (window.innerWidth < 768) setExpanded(false);
                    }}
                  >
                    <span className="sidebar__nav-icon">
                      <Icon size={20} />
                    </span>
                    {expanded && (
                      <span className="sidebar__nav-label">{item.label}</span>
                    )}
                    {isActive && <span className="sidebar__nav-indicator" />}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Toggle Button */}
        <button
          className="sidebar__toggle"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Recolher menu' : 'Expandir menu'}
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </aside>
    </>
  );
}

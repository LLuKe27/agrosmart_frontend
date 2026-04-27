import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import './Topbar.css';

export default function Topbar({ title, subtitle }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar" role="banner">
      <div className="topbar__left">
        <div className="topbar__greeting">
          <h1 className="topbar__title">{title || 'Dashboard'}</h1>
          {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="topbar__center">
        <span className="topbar__date">{dateStr}</span>
      </div>

      <div className="topbar__right">
        <div className="topbar__search">
          <Search size={16} className="topbar__search-icon" />
          <input
            type="text"
            placeholder="Buscar..."
            className="topbar__search-input"
            id="global-search"
            aria-label="Busca global"
          />
        </div>

        <button className="topbar__icon-btn" aria-label="Notificações" id="btn-notifications">
          <Bell size={18} />
          <span className="topbar__notification-dot" />
        </button>

        <div className="topbar__user-container" ref={menuRef}>
          <button 
            className="topbar__avatar" 
            aria-label="Menu do usuário" 
            id="btn-user-menu"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <User size={18} />
          </button>

          {isUserMenuOpen && (
            <div className="topbar__user-menu">
              <button className="user-menu__item">
                <div className="user-menu__icon">
                  <Settings size={14} />
                </div>
                Configurações
              </button>
              <button className="user-menu__item user-menu__item--danger">
                <div className="user-menu__icon">
                  <LogOut size={14} />
                </div>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

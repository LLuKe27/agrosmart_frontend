import './UI.css';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { useEffect } from 'react';
export { DatePicker } from './DatePicker';
export { MonthPicker } from './MonthPicker';
export { ConfirmModal } from './ConfirmModal';
export { FilterModal } from './FilterModal';

// ==================== CARD ====================
export function Card({ children, className = '', hover = false }) {
  return (
    <div className={`card ${hover ? 'card--hoverable' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ==================== BUTTON ====================
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  fullWidth, 
  isLoading, 
  className = '', 
  ...props 
}) {
  return (
    <button 
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

// ==================== STAT CARD ====================
export function StatCard({ title, value, icon, trend, trendValue, color = 'primary', linkTo, className = '' }) {
  const isPositive = trend === 'up';
  
  return (
    <Card hover className={`stat-card stat-card--${color} ${className}`}>
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        {linkTo && (
          <Link to={linkTo} className="stat-card__link-btn">
            <ArrowUpRight size={18} />
          </Link>
        )}
      </div>
      <div className="stat-card__body">
        <div className="stat-card__value">{value}</div>
      </div>
      <div className="stat-card__footer-row">
        <div className={`stat-card__icon bg-${color}-glow`}>
          {icon}
        </div>
        {trendValue && (
          <div className={`stat-card__trend-box ${isPositive ? 'text-green' : 'text-red'}`}>
            <span className="stat-card__trend">{trendValue}</span>
            <span className="stat-card__vs">vs mês passado</span>
          </div>
        )}
      </div>
    </Card>
  );
}

// ==================== MODAL ====================
export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

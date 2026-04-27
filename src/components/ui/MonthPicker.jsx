import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import './MonthPicker.css';

const MONTHS_SHORT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MONTHS_FULL = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function MonthPicker({ value, onChange, placeholder = "mês de referência", className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value ? new Date(value + '-01T12:00:00').getFullYear() : new Date().getFullYear());
  const containerRef = useRef(null);

  // Parse value: format expected "YYYY-MM"
  const selectedDate = value ? new Date(value + '-01T12:00:00') : null;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevYear = (e) => {
    e.preventDefault();
    setViewYear(viewYear - 1);
  };

  const handleNextYear = (e) => {
    e.preventDefault();
    setViewYear(viewYear + 1);
  };

  const handleMonthClick = (monthIdx) => {
    const monthStr = String(monthIdx + 1).padStart(2, '0');
    const newValue = `${viewYear}-${monthStr}`;
    if (onChange) onChange(newValue);
    setIsOpen(false);
  };

  const formatDisplay = (val) => {
    if (!val) return '';
    const [y, m] = val.split('-');
    return `${MONTHS_FULL[parseInt(m) - 1]} de ${y}`;
  };

  const isSelected = (monthIdx) => {
    if (!selectedDate) return false;
    return selectedDate.getMonth() === monthIdx && selectedDate.getFullYear() === viewYear;
  };

  const isCurrentMonth = (monthIdx) => {
    const now = new Date();
    return now.getMonth() === monthIdx && now.getFullYear() === viewYear;
  };

  const handleClear = () => {
    if (onChange) onChange('');
    setIsOpen(false);
  };

  const handleThisMonth = () => {
    const now = new Date();
    const val = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`custom-monthpicker ${className}`} ref={containerRef}>
      <button 
        type="button" 
        className="monthpicker-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'month-selected' : 'month-placeholder'}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <CalendarIcon size={16} className="monthpicker-icon" />
      </button>

      {isOpen && (
        <div className="monthpicker-popup">
          <div className="monthpicker-header">
            <button className="nav-btn" onClick={handlePrevYear}>
              <ChevronLeft size={16} />
            </button>
            <div className="current-year">{viewYear}</div>
            <button className="nav-btn" onClick={handleNextYear}>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="month-grid">
            {MONTHS_SHORT.map((m, idx) => (
              <button
                key={m}
                type="button"
                className={`month-btn ${isSelected(idx) ? 'selected' : ''} ${isCurrentMonth(idx) && !isSelected(idx) ? 'current' : ''}`}
                onClick={() => handleMonthClick(idx)}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="monthpicker-footer">
            <button type="button" className="footer-btn action-clear" onClick={handleClear}>Limpar</button>
            <button type="button" className="footer-btn action-today" onClick={handleThisMonth}>Este mês</button>
          </div>
        </div>
      )}
    </div>
  );
}

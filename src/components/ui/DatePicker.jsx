import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import './DatePicker.css';

const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function DatePicker({ value, onChange, placeholder = "dd/mm/aaaa", className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  
  const containerRef = useRef(null);

  // Parse input value
  const selectedDate = value ? new Date(value) : null;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Format to YYYY-MM-DD
    const isoString = newDate.toISOString().split('T')[0];
    if (onChange) onChange(isoString);
    setIsOpen(false);
  };

  // Calendar logic
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const ds = [];
  for (let i = 0; i < firstDay; i++) {
    ds.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    ds.push(i);
  }

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T12:00:00'); // Prevent timezone shift
    return d.toLocaleDateString('pt-BR');
  };

  const isSelected = (day) => {
    if (!selectedDate || !day) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  return (
    <div className={`custom-datepicker ${className}`} ref={containerRef}>
      <button 
        type="button" 
        className="datepicker-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedDate ? 'date-selected' : 'date-placeholder'}>
          {selectedDate ? formatDisplayDate(value) : placeholder}
        </span>
        <CalendarIcon size={16} className="datepicker-icon" />
      </button>

      {isOpen && (
        <div className="datepicker-popup">
          <div className="datepicker-header">
            <button className="nav-btn" onClick={handlePrevMonth}>
              <ChevronLeft size={16} />
            </button>
            <div className="current-month">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button className="nav-btn" onClick={handleNextMonth}>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="datepicker-grid">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="weekday-header">{d}</div>
            ))}
            
            {ds.map((day, idx) => (
              <div key={idx} className="day-cell-wrapper">
                {day ? (
                  <button
                    type="button"
                    className={`day-btn ${isSelected(day) ? 'selected' : ''} ${isToday(day) && !isSelected(day) ? 'today' : ''}`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </button>
                ) : (
                  <span className="empty-day" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

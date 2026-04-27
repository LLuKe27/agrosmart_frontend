/**
 * Utility formatters for the AgroSmart application
 * Handles currency, date, and number formatting for pt-BR locale
 */

/**
 * Format a number as Brazilian Real currency (R$)
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number with locale-specific separators
 * @param {number} value - The numeric value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export function formatNumber(value, decimals = 0) {
  if (value === null || value === undefined || isNaN(value)) return '0';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a date string to pt-BR locale
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

/**
 * Format date for input fields (YYYY-MM-DD)
 * @param {Date} date 
 * @returns {string}
 */
export function formatDateForInput(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Get current month in YYYY-MM format
 * @returns {string}
 */
export function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Get month name in Portuguese
 * @param {number} month - Month index (0-11)
 * @returns {string}
 */
export function getMonthName(month) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  return months[month] || '';
}

/**
 * Format liters of milk production
 * @param {number} value
 * @returns {string}
 */
export function formatLiters(value) {
  if (value === null || value === undefined || isNaN(value)) return '0 L';
  return `${formatNumber(value, 1)} L`;
}

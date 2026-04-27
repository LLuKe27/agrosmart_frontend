/**
 * API Service Layer
 * Centralized service for all REST API calls
 * Configurable base URL for easy backend integration
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) return null;
    
    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
    throw error;
  }
}

// ==================== ANIMAIS ====================

export const animalsService = {
  getAll: () => apiRequest('/animais'),
  getById: (id) => apiRequest(`/animais/${id}`),
  create: (data) => apiRequest('/animais', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/animais/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/animais/${id}`, {
    method: 'DELETE',
  }),
};

// ==================== PRODUÇÃO ====================

export const productionService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.dataInicio) query.append('dataInicio', params.dataInicio);
    if (params.dataFim) query.append('dataFim', params.dataFim);
    const queryStr = query.toString();
    return apiRequest(`/producoes${queryStr ? `?${queryStr}` : ''}`);
  },
  create: (data) => apiRequest('/producoes', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/producoes/${id}`, {
    method: 'DELETE',
  }),
};

// ==================== DESPESAS ====================

export const expensesService = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.dataInicio) query.append('dataInicio', params.dataInicio);
    if (params.dataFim) query.append('dataFim', params.dataFim);
    const queryStr = query.toString();
    return apiRequest(`/despesas${queryStr ? `?${queryStr}` : ''}`);
  },
  create: (data) => apiRequest('/despesas', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/despesas/${id}`, {
    method: 'DELETE',
  }),
};

// ==================== FUNCIONÁRIOS ====================

export const employeesService = {
  getAll: () => apiRequest('/funcionarios'),
  create: (data) => apiRequest('/funcionarios', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/funcionarios/${id}`, {
    method: 'DELETE',
  }),
};

// ==================== RELATÓRIOS ====================

export const reportsService = {
  getMonthly: (month) => apiRequest(`/relatorios?mes=${month}`),
  getDashboard: () => apiRequest('/dashboard'),
};

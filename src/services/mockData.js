/**
 * Mock data for development/demo when API is not available
 * This allows the frontend to work standalone for presentation
 */

export const mockAnimals = [
  { id: 1, nome: 'Mimosa', tipo: 'Vaca', raca: 'Holandesa', idade: 5, peso: 480, status: 'Ativo' },
  { id: 2, nome: 'Estrela', tipo: 'Vaca', raca: 'Jersey', idade: 3, peso: 400, status: 'Ativo' },
  { id: 3, nome: 'Trovão', tipo: 'Touro', raca: 'Nelore', idade: 4, peso: 620, status: 'Ativo' },
  { id: 4, nome: 'Pintada', tipo: 'Vaca', raca: 'Gir Leiteira', idade: 6, peso: 450, status: 'Ativo' },
  { id: 5, nome: 'Boneca', tipo: 'Vaca', raca: 'Girolando', idade: 2, peso: 380, status: 'Ativo' },
  { id: 6, nome: 'Valente', tipo: 'Bezerro', raca: 'Nelore', idade: 1, peso: 180, status: 'Ativo' },
  { id: 7, nome: 'Princesa', tipo: 'Vaca', raca: 'Holandesa', idade: 4, peso: 500, status: 'Inativo' },
  { id: 8, nome: 'Relâmpago', tipo: 'Touro', raca: 'Angus', idade: 3, peso: 580, status: 'Ativo' },
];

export const mockProduction = [
  { id: 1, quantidade: 28.5, data: '2026-04-26', tipo: 'Leite' },
  { id: 2, quantidade: 22.0, data: '2026-04-26', tipo: 'Leite' },
  { id: 3, quantidade: 18.5, data: '2026-04-26', tipo: 'Queijo' },
  { id: 4, quantidade: 15.0, data: '2026-04-26', tipo: 'Leite' },
  { id: 5, quantidade: 27.0, data: '2026-04-25', tipo: 'Queijo' },
  { id: 6, quantidade: 21.5, data: '2026-04-25', tipo: 'Leite' },
  { id: 7, quantidade: 19.0, data: '2026-04-25', tipo: 'Leite' },
  { id: 8, quantidade: 26.0, data: '2026-04-24', tipo: 'Leite' },
  { id: 9, quantidade: 23.0, data: '2026-04-24', tipo: 'Queijo' },
  { id: 10, quantidade: 16.0, data: '2026-04-24', tipo: 'Leite' },
  { id: 11, quantidade: 29.0, data: '2026-04-23', tipo: 'Leite' },
  { id: 12, quantidade: 17.5, data: '2026-04-23', tipo: 'Queijo' },
];

export const mockExpenses = [
  { id: 1, descricao: 'Ração bovina - 500kg', categoria: 'Alimentação', valor: 1250.00, data: '2026-04-25' },
  { id: 2, descricao: 'Vacina Aftosa', categoria: 'Saúde Animal', valor: 890.00, data: '2026-04-22' },
  { id: 3, descricao: 'Manutenção trator', categoria: 'Manutenção', valor: 2300.00, data: '2026-04-20' },
  { id: 4, descricao: 'Sal mineral - 200kg', categoria: 'Alimentação', valor: 680.00, data: '2026-04-18' },
  { id: 5, descricao: 'Energia elétrica', categoria: 'Infraestrutura', valor: 1450.00, data: '2026-04-15' },
  { id: 6, descricao: 'Combustível', categoria: 'Operacional', valor: 980.00, data: '2026-04-12' },
  { id: 7, descricao: 'Assistência veterinária', categoria: 'Saúde Animal', valor: 750.00, data: '2026-04-10' },
  { id: 8, descricao: 'Cerca elétrica - reparo', categoria: 'Infraestrutura', valor: 420.00, data: '2026-04-08' },
];

export const mockLucros = [
  { id: 1, descricao: 'Venda de Leite - Cooperativa', categoria: 'Produção', valor: 18500.00, data: '2026-04-26' },
  { id: 2, descricao: 'Venda de Bezerros', categoria: 'Vendas', valor: 5500.00, data: '2026-04-20' },
  { id: 3, descricao: 'Substituição Reprodutor', categoria: 'Outros', valor: 12000.00, data: '2026-04-10' },
];

export const mockEmployees = [
  { id: 1, nome: 'Carlos Silva', cargo: 'Gerente de Fazenda', telefone: '(11) 99999-1234', salario: 5500.00, dataAdmissao: '2024-01-15' },
  { id: 2, nome: 'Maria Oliveira', cargo: 'Ordenhadora', telefone: '(11) 99888-5678', salario: 2800.00, dataAdmissao: '2024-03-01' },
  { id: 3, nome: 'João Santos', cargo: 'Tratador', telefone: '(11) 99777-9012', salario: 2500.00, dataAdmissao: '2024-06-10' },
  { id: 4, nome: 'Ana Costa', cargo: 'Veterinária', telefone: '(11) 99666-3456', salario: 7200.00, dataAdmissao: '2025-01-05' },
  { id: 5, nome: 'Pedro Souza', cargo: 'Operador de Máquinas', telefone: '(11) 99555-7890', salario: 3200.00, dataAdmissao: '2025-04-20' },
];

export const mockDashboard = {
  totalAnimais: 8,
  producaoDia: 84.0,
  producaoMes: 2520.0,
  despesasMes: 8720.00,
  saldo: 15280.00,
  receitaMes: 24000.00,
};

export const mockProductionChart = [
  { dia: '20/04', quantidade: 72 },
  { dia: '21/04', quantidade: 78 },
  { dia: '22/04', quantidade: 85 },
  { dia: '23/04', quantidade: 46.5 },
  { dia: '24/04', quantidade: 65 },
  { dia: '25/04', quantidade: 67.5 },
  { dia: '26/04', quantidade: 84 },
];

export const mockExpensesByCategory = [
  { categoria: 'Alimentação', valor: 1930, color: '#6366f1' },
  { categoria: 'Saúde Animal', valor: 1640, color: '#22d3ee' },
  { categoria: 'Manutenção', valor: 2300, color: '#f59e0b' },
  { categoria: 'Infraestrutura', valor: 1870, color: '#10b981' },
  { categoria: 'Operacional', valor: 980, color: '#ef4444' },
];

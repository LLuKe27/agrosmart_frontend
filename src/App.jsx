import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import Animals from './components/animals/Animals';
import Production from './components/production/Production';
import Expenses from './components/expenses/Expenses';
import Employees from './components/employees/Employees';
import Reports from './components/reports/Reports';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout title="AgroSmart" subtitle="Sistema de Gestão Agropecuária" />}>
        <Route index element={<Dashboard />} />
        <Route path="animais" element={<Animals />} />
        <Route path="producao" element={<Production />} />
        <Route path="despesas" element={<Expenses />} />
        <Route path="funcionarios" element={<Employees />} />
        <Route path="relatorios" element={<Reports />} />
      </Route>
    </Routes>
  );
}

export default App;

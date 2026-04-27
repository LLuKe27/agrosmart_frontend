import { useState, useMemo } from 'react';
import { Card, StatCard, MonthPicker } from '../ui';
import { mockDashboard, mockExpensesByCategory } from '../../services/mockData';
import { formatCurrency } from '../../utils/formatters';
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('2026-04');
  
  // Data simulated calculation based on mock data
  const reportData = useMemo(() => {
    return {
      receitaMes: mockDashboard.receitaMes,
      despesasMes: mockDashboard.despesasMes,
      saldo: mockDashboard.receitaMes - mockDashboard.despesasMes,
      expensesByCategory: mockExpensesByCategory
    };
  }, [selectedMonth]);

  return (
    <div className="page-container stagger-1">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Relatórios Financeiros</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
          <label className="form-label" style={{ marginBottom: 0 }}>Mês de Referência:</label>
          <MonthPicker 
            value={selectedMonth}
            onChange={(val) => setSelectedMonth(val)}
            style={{ width: '220px' }}
          />
        </div>
      </div>

      <div className="grid dashboard-grid mb-8">
        <StatCard 
          title="Receita Total no Mês" 
          value={formatCurrency(reportData.receitaMes)} 
          icon={<TrendingUp size={24} />} 
          color="green"
        />
        <StatCard 
          title="Despesas no Mês" 
          value={formatCurrency(reportData.despesasMes)} 
          icon={<TrendingDown size={24} />} 
          color="red"
        />
        <StatCard 
          title="Saldo Líquido" 
          value={formatCurrency(reportData.saldo)} 
          icon={<DollarSign size={24} />} 
          color={reportData.saldo >= 0 ? "cyan" : "red"}
        />
      </div>

      <div className="grid-cols-2 mt-6 stagger-2">
        <Card>
          <h3 className="text-xl font-bold mb-6">Despesas por Categoria</h3>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportData.expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="valor"
                  nameKey="categoria"
                >
                  {reportData.expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-card)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-6">Resumo Mensal</h3>
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex-between py-4 border-b" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-muted font-medium">Total de Receitas</span>
              <span className="font-bold text-green-500" style={{ color: 'var(--accent-green)' }}>
                {formatCurrency(reportData.receitaMes)}
              </span>
            </div>
            <div className="flex-between py-4 border-b" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="text-muted font-medium">Total de Despesas</span>
              <span className="font-bold text-red-500" style={{ color: 'var(--accent-red)' }}>
                {formatCurrency(reportData.despesasMes)}
              </span>
            </div>
            <div className="flex-between py-4 mt-4 bg-elevated rounded-lg" style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '8px' }}>
              <span className="text-lg font-bold">Resultado Líquido</span>
              <span className={`text-xl font-bold ${reportData.saldo >= 0 ? 'text-green-500' : 'text-red-500'}`} style={{ color: reportData.saldo >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {formatCurrency(reportData.saldo)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
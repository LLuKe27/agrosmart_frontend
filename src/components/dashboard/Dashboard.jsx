import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, StatCard } from '../ui';
import { mockDashboard, mockProductionChart, mockWeatherChart } from '../../services/mockData';
import { formatCurrency, formatNumber, formatLiters } from '../../utils/formatters';
import { PawPrint, Milk, DollarSign, Wallet, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Greeting logic
  const usuario = "Fazendeiro"; // This could come from context

  useEffect(() => {
    // Simulate API load
    setTimeout(() => {
      setData(mockDashboard);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return <div className="loading-state">Carregando dashboard...</div>;
  }

  return (
    <div className="dashboard pb-4">
      {/* Greeting Box */}
      <div className="dashboard-greeting mb-4">
        <h1 className="text-4xl font-bold">Olá, {usuario}!</h1>
      </div>

      {/* Cards Row - Grid Layout */}
      <div className="dashboard-grid mb-6 stagger-1">
        {/* Row 1: 1 col */}
        <div className="dash-card-animais">
          <StatCard 
            title="Total de Animais" 
            value={formatNumber(data.totalAnimais)} 
            icon={<PawPrint size={24} />} 
            color="primary"
            linkTo="/animais"
          />
        </div>

        {/* Row 1: 2 cols */}
        <div className="dash-card-prodmes">
          <StatCard 
            title="Produção no Mês" 
            value={formatLiters(data.producaoMes)} 
            icon={<TrendingUp size={24} />} 
            color="green"
            linkTo="/producao"
          />
        </div>
        
        {/* Row 2: 1 col */}
        <div className="dash-card-proddia">
          <StatCard 
            title="Produção do Dia" 
            value={formatLiters(data.producaoDia)} 
            icon={<Milk size={24} />} 
            color="cyan"
            trend="up"
            trendValue="+5%"
            linkTo="/producao"
          />
        </div>

        {/* Row 2: 1 col */}
        <div className="dash-card-saldo">
          <StatCard 
            title="Saldo Líquido" 
            value={formatCurrency(data.saldo)} 
            icon={<Wallet size={24} />} 
            color={data.saldo >= 0 ? "green" : "red"}
            linkTo="/relatorios"
          />
        </div>

        {/* Row 2: 1 col */}
        <div className="dash-card-despesas">
          <StatCard 
            title="Despesas do Mês" 
            value={formatCurrency(data.despesasMes)} 
            icon={<DollarSign size={24} />} 
            color="red"
            linkTo="/despesas"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-md)' }} className="stagger-2">
        <Card>
          <div className="flex-between mb-6">
            <h3 className="text-xl font-bold">Produção de Leite (Últimos 7 dias)</h3>
            <Link to="/producao" className="stat-card__link-btn">
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="h-80 w-full" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockProductionChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="dia" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-card)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="quantidade" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex-between mb-6">
            <h3 className="text-xl font-bold">Previsão do Tempo (Próximos 7 dias)</h3>
            <div style={{
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '24px',
              padding: '4px 20px',
              fontSize: '1.8rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              0º
            </div>
          </div>
          <div className="h-80 w-full" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeatherChart} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeather" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="dia" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" tickFormatter={(tick) => `${tick}°C`} />
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-card)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                  formatter={(value) => [`${value}°C`, 'Temperatura']}
                />
                <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWeather)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

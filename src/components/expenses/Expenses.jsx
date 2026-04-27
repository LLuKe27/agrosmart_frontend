import { useState, useMemo } from 'react';
import { Card, Button, Modal, DatePicker, ConfirmModal, StatCard, FilterModal } from '../ui';
import { mockExpenses, mockLucros } from '../../services/mockData';
import { useNotification } from '../../context/NotificationContext';
import { formatDate, formatDateForInput, formatCurrency } from '../../utils/formatters';
import { Plus, Filter, Trash2, DollarSign } from 'lucide-react';

export default function Financeiro() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [lucros, setLucros] = useState(mockLucros);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('saida'); // 'saida' or 'entrada'
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [tempDateFilter, setTempDateFilter] = useState({ start: '', end: '' });
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const { success, warning } = useNotification();

  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: formatDateForInput(new Date())
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      if (dateFilter.start && new Date(exp.data) < new Date(dateFilter.start)) return false;
      if (dateFilter.end && new Date(exp.data) > new Date(dateFilter.end)) return false;
      return true;
    });
  }, [expenses, dateFilter]);

  const filteredLucros = useMemo(() => {
    return lucros.filter(luc => {
      if (dateFilter.start && new Date(luc.data) < new Date(dateFilter.start)) return false;
      if (dateFilter.end && new Date(luc.data) > new Date(dateFilter.end)) return false;
      return true;
    });
  }, [lucros, dateFilter]);

  const totals = useMemo(() => {
    const totalDespesas = filteredExpenses.reduce((acc, curr) => acc + curr.valor, 0);
    const totalLucros = filteredLucros.reduce((acc, curr) => acc + curr.valor, 0);
    return {
      despesas: totalDespesas,
      lucros: totalLucros,
      saldo: totalLucros - totalDespesas
    };
  }, [filteredExpenses, filteredLucros]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete.type === 'despesa') {
      setExpenses(expenses.filter(e => e.id !== itemToDelete.id));
    } else {
      setLucros(lucros.filter(l => l.id !== itemToDelete.id));
    }
    setIsConfirmOpen(false);
    setItemToDelete(null);
    warning('Item excluído com sucesso!');
  };

  const handleOpenModal = () => {
    setModalType('saida');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      descricao: formData.descricao,
      valor: parseFloat(formData.valor),
      data: formData.data
    };
    
    if (modalType === 'saida') {
      setExpenses([newItem, ...expenses]);
    } else {
      setLucros([newItem, ...lucros]);
    }
    
    success('Operação registrada com sucesso!');
    setIsModalOpen(false);
    setFormData({ descricao: '', valor: '', data: formatDateForInput(new Date()) });
  };

  return (
    <div className="page-container stagger-1">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <div className="flex gap-4">
          <Button variant="secondary" icon={<Filter size={18} />} onClick={() => {
            setTempDateFilter(dateFilter);
            setIsFilterModalOpen(true);
          }}>
            Filtros {(dateFilter.start || dateFilter.end) ? '(Ativo)' : ''}
          </Button>
          <Button icon={<Plus size={18} />} onClick={handleOpenModal}>
            Cadastrar Operação
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <StatCard 
          title="SALDO LÍQUIDO" 
          value={formatCurrency(totals.saldo)} 
          icon={<DollarSign size={24} />} 
          color={totals.saldo >= 0 ? "cyan" : "red"}
          onClick={handleOpenModal}
          style={{ maxWidth: '400px', cursor: 'pointer' }}
        />
      </div>


      <div className="finance-tables-split">
        <Card className="flex-1">
          <h3 className="section-title mb-6">Entradas / Lucros</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredLucros.map(luc => (
                  <tr key={luc.id}>
                    <td>{formatDate(luc.data)}</td>
                    <td className="font-medium">{luc.descricao}</td>
                    <td className="font-medium text-green-500" style={{ color: 'var(--accent-green)' }}>
                      {formatCurrency(luc.valor)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon-danger" onClick={() => handleDeleteClick({...luc, type: 'lucro'})}>
                        <Trash2 size={18} />
                        <span>Deletar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="flex-1">
          <h3 className="section-title mb-6">Saídas / Despesas</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map(exp => (
                  <tr key={exp.id}>
                    <td>{formatDate(exp.data)}</td>
                    <td className="font-medium">{exp.descricao}</td>
                    <td className="font-medium text-red-500" style={{ color: 'var(--accent-red)' }}>
                      {formatCurrency(exp.valor)}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon-danger" onClick={() => handleDeleteClick({...exp, type: 'despesa'})}>
                        <Trash2 size={18} />
                        <span>Deletar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Cadastrar Operação"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tipo de Operação</label>
            <select 
              className="form-control"
              value={modalType}
              onChange={e => setModalType(e.target.value)}
            >
              <option value="entrada">Entrada (Lucro)</option>
              <option value="saida">Saída (Despesa)</option>
            </select>
          </div>
          <div className="grid-cols-2">
            <div className="form-group position-relative">
              <label className="form-label">Data</label>
              <DatePicker 
                value={formData.data}
                onChange={val => setFormData({...formData, data: val})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Valor (R$)</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                className="form-control"
                required
                value={formData.valor}
                onChange={e => setFormData({...formData, valor: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <input 
              type="text" 
              className="form-control" 
              required
              placeholder={modalType === 'saida' ? "Ex: Compra de ração" : "Ex: Venda de leite"}
              value={formData.descricao}
              onChange={e => setFormData({...formData, descricao: e.target.value})}
            />
          </div>
          <div className="form-actions mt-6 flex justify-end gap-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant={modalType === 'saida' ? "primary" : "secondary"} type="submit" className={modalType === 'entrada' ? 'btn-success' : ''}>
              Salvar Operação
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title={itemToDelete?.type === 'despesa' ? "Deletar despesa?" : "Deletar lucro?"}
        message={`Você tem certeza que deseja excluir "${itemToDelete?.descricao}"? Esta ação não pode ser desfeita.`}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={() => {
          setDateFilter(tempDateFilter);
          setIsFilterModalOpen(false);
          success('Filtros aplicados com sucesso!');
        }}
        onClear={() => {
          setTempDateFilter({ start: '', end: '' });
          setDateFilter({ start: '', end: '' });
          setIsFilterModalOpen(false);
          warning('Filtros removidos.');
        }}
      >
        <div className="grid-cols-2">
          <div className="form-group position-relative">
            <label className="form-label">Data Inicial</label>
            <DatePicker 
              value={tempDateFilter.start}
              onChange={val => setTempDateFilter({...tempDateFilter, start: val})}
            />
          </div>
          <div className="form-group position-relative">
            <label className="form-label">Data Final</label>
            <DatePicker 
              value={tempDateFilter.end}
              onChange={val => setTempDateFilter({...tempDateFilter, end: val})}
            />
          </div>
        </div>
      </FilterModal>
    </div>
  );
}

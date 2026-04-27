import { useState, useMemo } from 'react';
import { Card, Button, Modal, DatePicker, ConfirmModal, FilterModal } from '../ui';
import { mockProduction, mockAnimals } from '../../services/mockData';
import { useNotification } from '../../context/NotificationContext';
import { formatDate, formatDateForInput, formatLiters } from '../../utils/formatters';
import { Plus, Filter, Trash2 } from 'lucide-react';

export default function Production() {
  const [production, setProduction] = useState(mockProduction);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [tempDateFilter, setTempDateFilter] = useState({ start: '', end: '' });
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const { success, warning } = useNotification();

  const [formData, setFormData] = useState({
    tipo: 'Leite',
    quantidade: '',
    data: formatDateForInput(new Date())
  });

  const filteredProduction = useMemo(() => {
    return production.filter(prod => {
      if (dateFilter.start && new Date(prod.data) < new Date(dateFilter.start)) return false;
      if (dateFilter.end && new Date(prod.data) > new Date(dateFilter.end)) return false;
      return true;
    });
  }, [production, dateFilter]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setProduction(production.filter(p => p.id !== itemToDelete.id));
    setIsConfirmOpen(false);
    setItemToDelete(null);
    warning('Registro de produção excluído!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProd = {
      id: Date.now(),
      tipo: formData.tipo,
      quantidade: parseFloat(formData.quantidade),
      data: formData.data
    };
    
    setProduction([newProd, ...production]);
    success('Produção registrada com sucesso!');
    setIsModalOpen(false);
    setFormData({ tipo: 'Leite', quantidade: '', data: formatDateForInput(new Date()) });
  };

  return (
    <div className="page-container stagger-1">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Produção Leiteira</h1>
        <div className="flex gap-4">
          <Button variant="secondary" icon={<Filter size={18} />} onClick={() => {
            setTempDateFilter(dateFilter);
            setIsFilterModalOpen(true);
          }}>
            Filtros {(dateFilter.start || dateFilter.end) ? '(Ativo)' : ''}
          </Button>
          <Button icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
            Registrar Produção
          </Button>
        </div>
      </div>


      <Card>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduction.map(prod => (
                <tr key={prod.id}>
                  <td>{formatDate(prod.data)}</td>
                  <td><span className={`badge ${prod.tipo === 'Leite' ? 'badge--info' : 'badge--warning'}`}>{prod.tipo}</span></td>
                  <td className="font-medium">
                    {prod.quantidade} {prod.tipo === 'Leite' ? 'L' : 'kg'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn-icon-danger" 
                      onClick={() => handleDeleteClick(prod)}
                      title="Deletar"
                    >
                      <Trash2 size={18} />
                      <span>Deletar</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProduction.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-8">
                    Nenhum registro encontrado para este período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Produção">
        <form onSubmit={handleSubmit}>
          <div className="form-group position-relative">
            <label className="form-label">Data</label>
            <DatePicker 
              value={formData.data}
              onChange={val => setFormData({...formData, data: val})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de Produção</label>
            <select 
              className="form-control"
              required
              value={formData.tipo}
              onChange={e => setFormData({...formData, tipo: e.target.value})}
            >
              <option value="Leite">Leite</option>
              <option value="Queijo">Queijo</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Quantidade ({formData.tipo === 'Leite' ? 'Litros' : 'Quilos'})</label>
            <input 
              type="number" 
              step="0.1"
              min="0"
              className="form-control"
              required
              value={formData.quantidade}
              onChange={e => setFormData({...formData, quantidade: e.target.value})}
            />
          </div>
          <div className="form-actions mt-6 flex justify-end gap-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Salvar Registro</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Deletar registro?"
        message={`Deseja realmente excluir este registro de produção (${itemToDelete?.quantidade} ${itemToDelete?.tipo === 'Leite' ? 'L' : 'kg'})?`}
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

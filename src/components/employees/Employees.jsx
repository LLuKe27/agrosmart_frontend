import { useState } from 'react';
import { Card, Button, Modal, ConfirmModal } from '../ui';
import { mockEmployees } from '../../services/mockData';
import { useNotification } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Trash2 } from 'lucide-react';

export default function Employees() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { success, warning } = useNotification();

  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    salario: ''
  });

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setEmployees(employees.filter(e => e.id !== itemToDelete.id));
    setIsConfirmOpen(false);
    setItemToDelete(null);
    warning('Funcionário removido do quadro!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmp = {
      id: Date.now(),
      ...formData,
      salario: parseFloat(formData.salario)
    };

    setEmployees([newEmp, ...employees]);
    success('Funcionário cadastrado com sucesso!');
    setIsModalOpen(false);
    setFormData({ nome: '', cargo: '', salario: '' });
  };

  return (
    <div className="page-container stagger-1">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Quadro de Funcionários</h1>
        <Button icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
          Novo Funcionário
        </Button>
      </div>

      <Card>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Salário Base</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td className="font-medium">{emp.nome}</td>
                  <td>{emp.cargo}</td>
                  <td>{formatCurrency(emp.salario)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn-icon-danger"
                      onClick={() => handleDeleteClick(emp)}
                      title="Deletar"
                    >
                      <Trash2 size={18} />
                      <span>Deletar</span>
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-8">
                    Nenhum funcionário cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar Funcionário">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome Completo</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.nome}
              onChange={e => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cargo</label>
            <input
              type="text"
              className="form-control"
              required
              value={formData.cargo}
              onChange={e => setFormData({ ...formData, cargo: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Salário (R$)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              required
              value={formData.salario}
              onChange={e => setFormData({ ...formData, salario: e.target.value })}
            />
          </div>
          <div className="form-actions mt-6 flex justify-end gap-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Salvar Funcionário</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remover funcionário?"
        message={`Tem certeza que deseja remover ${itemToDelete?.nome} do sistema? Esta ação é irreversível.`}
      />
    </div>
  );
}

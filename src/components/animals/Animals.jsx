import { useState } from 'react';
import { Card, Button, Modal } from '../ui';
import { mockAnimals } from '../../services/mockData';
import { useNotification } from '../../context/NotificationContext';
import { Plus, Trash2 } from 'lucide-react';
import './Animals.css';

export default function Animals() {
  const [animals, setAnimals] = useState(mockAnimals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success, error } = useNotification();

  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'Vaca',
    raca: '',
    idade: ''
  });

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este animal?')) {
      setAnimals(prev => prev.filter(a => a.id !== id));
      success('Animal deletado com sucesso!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newAnimal = {
        id: Date.now(),
        ...formData,
        status: 'Ativo'
      };
      setAnimals([newAnimal, ...animals]);
      success('Animal cadastrado com sucesso!');
      setIsModalOpen(false);
      setFormData({ nome: '', tipo: 'Vaca', raca: '', idade: '' });
    } catch (err) {
      error('Erro ao cadastrar animal');
    }
  };

  return (
    <div className="page-container stagger-1">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Gestão de Animais</h1>
        <Button icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>
          Novo Animal
        </Button>
      </div>

      <Card>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Raça</th>
                <th>Idade (anos)</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {animals.map(animal => (
                <tr key={animal.id}>
                  <td className="font-medium">{animal.nome}</td>
                  <td>{animal.tipo}</td>
                  <td>{animal.raca}</td>
                  <td>{animal.idade}</td>
                  <td>
                    <span className={`badge ${animal.status === 'Ativo' ? 'badge--success' : 'badge--danger'}`}>
                      {animal.status}
                    </span>
                  </td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      icon={<Trash2 size={16} />}
                      onClick={() => handleDelete(animal.id)}
                    >
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
              {animals.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-8">
                    Nenhum animal cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Cadastrar Novo Animal">
        <form onSubmit={handleSubmit} className="animal-form">
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input 
              type="text" 
              className="form-control" 
              required
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo</label>
            <select 
              className="form-control"
              value={formData.tipo}
              onChange={e => setFormData({...formData, tipo: e.target.value})}
            >
              <option value="Vaca">Vaca</option>
              <option value="Touro">Touro</option>
              <option value="Bezerro">Bezerro</option>
              <option value="Novilha">Novilha</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Raça</label>
            <input 
              type="text" 
              className="form-control"
              required
              value={formData.raca}
              onChange={e => setFormData({...formData, raca: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Idade (anos)</label>
            <input 
              type="number" 
              className="form-control"
              min="0"
              value={formData.idade}
              onChange={e => setFormData({...formData, idade: e.target.value})}
            />
          </div>
          <div className="form-actions mt-6 flex justify-end gap-4">
            <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Salvar Animal</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

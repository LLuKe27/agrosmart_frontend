import { Modal, Button } from './index';
import { Filter, X } from 'lucide-react';
import './FilterModal.css';

export function FilterModal({ 
  isOpen, 
  onClose, 
  onApply, 
  onClear,
  title = "Filtros Avançados", 
  children 
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="filter-modal-body">
        {children}
        
        <div className="filter-actions form-actions mt-8 flex justify-end gap-4">
          <Button variant="secondary" type="button" onClick={onClear}>
            Limpar Filtros
          </Button>
          <Button variant="primary" type="button" onClick={onApply} icon={<Filter size={18} />}>
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </Modal>
  );
}

import { Modal, Button } from './index';
import { AlertCircle } from 'lucide-react';
import './ConfirmModal.css';

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Deletar este item?", 
  message = "Você tem certeza que deseja excluir este elemento? Esta ação é final.",
  confirmText = "Deletar",
  cancelText = "Cancelar",
  isDanger = true
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="confirm-modal-body">
        <div className="confirm-icon-wrapper">
          <div className="confirm-icon-bg">
            <AlertCircle size={32} />
          </div>
        </div>
        
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>
        
        <div className="confirm-actions">
          <button className="confirm-btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={`confirm-btn-action ${isDanger ? 'btn-danger' : 'btn-primary'}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

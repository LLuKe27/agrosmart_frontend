import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './Crops.css';

export default function Lavouras() {
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  return (
    <div className="page-container stagger-1">
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Analise de Campo <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>(prototipo)</span>
        </h1>
      </div>

      <div className="crops-layout">
        {/* Left Column */}
        <div className="crops-left">
          <div className="crops-upload-area">
            <div className="crops-upload-icon-wrapper">
              <ImageIcon size={40} color="#000" />
            </div>
            <p>Arraste sua imagem para esta area</p>
          </div>
          
          <button className="crops-btn-avancar">
            Avançar
          </button>
        </div>

        {/* Right Column */}
        <div className="crops-right">
          <div className="crops-input-card">
            <h3>Digite o Estado</h3>
            <input 
              type="text" 
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>

          <div className="crops-input-card">
            <h3>Digite a Cidade</h3>
            <input 
              type="text" 
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './MainLayout.css';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function MainLayout({ title, subtitle }) {
  const { notifications, removeNotification } = useNotification();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="notification-icon notification-icon--success" size={20} />;
      case 'error': return <AlertCircle className="notification-icon notification-icon--error" size={20} />;
      case 'warning': return <AlertTriangle className="notification-icon notification-icon--warning" size={20} />;
      default: return <Info className="notification-icon notification-icon--info" size={20} />;
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <Topbar title={title} subtitle={subtitle} />
        
        <main className="layout__main">
          <div className="layout__container">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Notifications Container */}
      <div className="notifications-container">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification notification--${notif.type}`}>
            {getNotificationIcon(notif.type)}
            <p className="notification-message">{notif.message}</p>
            <button 
              className="notification-close" 
              onClick={() => removeNotification(notif.id)}
              aria-label="AgroSmart"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { DashboardHome } from './components/DashboardHome';
import { MerchantDashboard } from './components/MerchantDashboard';
import { CustomerCheckout } from './components/CustomerCheckout';

export default function App() {
  const [view, setView] = useState<'home' | 'merchant' | 'customer'>('home');
  const [paymentData, setPaymentData] = useState<any>(null);

  const handleNavigate = (menuId: string) => {
    if (menuId === 'home') {
      setView('home');
    } else if (menuId === 'link') {
      setView('merchant');
    }
  };

  const handleGenerateLink = (data: any) => {
    setPaymentData(data);
    setTimeout(() => {
      setView('customer');
    }, 2000);
  };

  return (
    <div className="size-full">
      {view === 'home' && <DashboardHome onNavigate={handleNavigate} />}
      {view === 'merchant' && <MerchantDashboard onGenerateLink={handleGenerateLink} onNavigate={handleNavigate} />}
      {view === 'customer' && <CustomerCheckout onNavigate={handleNavigate} />}
    </div>
  );
}

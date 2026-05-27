import { useState } from 'react';
import { Home, Barcode, Car, Link2, Clock, Settings, LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import LogoParceleAqui from '../../imports/logo_parceleAqui.png';

interface SidebarProps {
  activeMenu?: string;
  onNavigate?: (menuId: string) => void;
}

export function Sidebar({ activeMenu = 'home', onNavigate }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, disabled: true },
    { id: 'parcelar', label: 'Parcelar Boletos', icon: Barcode, disabled: true },
    { id: 'veiculares', label: 'Débitos Veiculares', icon: Car, disabled: true },
    { id: 'link', label: 'Link Pagamento', icon: Link2, badge: 'Novo' },
    { id: 'historico', label: 'Histórico', icon: Clock, disabled: true },
    { id: 'config', label: 'Configurações', icon: Settings, disabled: true },
  ];

  const handleMenuClick = (menuId: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(menuId);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b flex items-center justify-between" style={{ padding: 'var(--s-4)', borderColor: 'var(--border)' }}>
        <div className="w-40">
          <img src={LogoParceleAqui} alt="Parcele Aqui" className="h-10 object-contain object-left" />
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 hover:bg-gray-50 rounded-lg transition-all active:scale-95"
          style={{ color: 'var(--fg)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col w-56 border-r relative"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'var(--border)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" style={{ zIndex: 1 }} />

        <div className="relative" style={{ zIndex: 10 }}>
          {/* Logo Section */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <img src={LogoParceleAqui} alt="Parcele Aqui" className="w-36 object-contain mb-1.5" style={{ position: 'relative', zIndex: 20 }} />
            <p className="text-[10px]" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)' }}>
              Powered by Potencial Tecnologia
            </p>
          </div>

          {/* Navigation */}
          <nav className="p-3 flex-1">
            <ul className="flex flex-col gap-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <li key={item.id}>
                    <motion.button
                      whileHover={!item.disabled ? { x: 3 } : {}}
                      whileTap={!item.disabled ? { scale: 0.98 } : {}}
                      onClick={() => !item.disabled && handleMenuClick(item.id)}
                      disabled={item.disabled}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all relative"
                      style={{
                        backgroundColor: isActive ? 'var(--bg-brand)' : 'transparent',
                        color: item.disabled ? 'var(--n-300)' : (isActive ? '#0A0A0A' : 'var(--fg-muted)'),
                        fontFamily: 'var(--font-sans)',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '13px',
                        opacity: item.disabled ? 0.5 : 1,
                        cursor: item.disabled ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: '#CC092F',
                            color: 'white',
                            fontWeight: 700,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* System Status */}
          <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 px-2.5 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px]" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)' }}>
                Sistema Operacional
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-50 w-full bg-white flex flex-col"
          >
            {/* Mobile Menu Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between bg-white border-b"
              style={{ padding: 'var(--s-4)', borderColor: 'var(--border)' }}
            >
              <div className="w-40">
                <img src={LogoParceleAqui} alt="Parcele Aqui" className="h-10 object-contain object-left" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 hover:bg-gray-50 rounded-lg transition-all active:scale-95"
                style={{ color: 'var(--fg)' }}
              >
                <X size={24} strokeWidth={2} />
              </button>
            </motion.div>

            <nav className="flex-1 p-4 pt-6">
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, staggerChildren: 0.05 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}
              >
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => !item.disabled && handleMenuClick(item.id)}
                        disabled={item.disabled}
                        className="w-full flex items-center transition-all"
                        style={{
                          gap: 'var(--s-3)',
                          padding: 'var(--s-3) var(--s-3)',
                          backgroundColor: isActive ? 'var(--bg-brand)' : 'transparent',
                          color: item.disabled ? 'var(--n-300)' : (isActive ? '#0A0A0A' : 'var(--fg-muted)'),
                          fontFamily: 'var(--font-sans)',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '15px',
                          borderRadius: 'var(--r-md)',
                          opacity: item.disabled ? 0.5 : 1,
                          cursor: item.disabled ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: '#CC092F',
                              color: 'white',
                              fontWeight: 700,
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="border-t"
              style={{ padding: 'var(--s-5)', borderColor: 'var(--border)' }}
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center hover:bg-gray-50 active:bg-gray-100 hover:translate-x-1 transition-all duration-200"
                style={{ gap: 'var(--s-3)', padding: 'var(--s-3) var(--s-3)', color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '15px', borderRadius: 'var(--r-md)' }}
              >
                <LogOut size={22} />
                Sair
              </button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

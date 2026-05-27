import { BarChart3, TrendingUp, CheckCircle2, ExternalLink, Scan, Settings, Link2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Sidebar } from './Sidebar';

interface DashboardHomeProps {
  onNavigate?: (menuId: string) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const recentActivities = [
    { cliente: 'Maria Silva Contabilidade', tipo: 'Link de Pagamento', valor: 'R$ 4.850,00', status: 'pago' },
    { cliente: 'João Oliveira Imóveis', tipo: 'Boleto Parcelado', valor: 'R$ 12.300,00', status: 'pago' },
    { cliente: 'Tech Solutions LTDA', tipo: 'Link de Pagamento', valor: 'R$ 2.100,00', status: 'pendente' },
    { cliente: 'Construtora ABC', tipo: 'IPVA Parcelado', valor: 'R$ 8.450,00', status: 'pago' },
    { cliente: 'Clínica Saúde Mais', tipo: 'Link de Pagamento', valor: 'R$ 1.750,00', status: 'expirado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return { bg: '#E8F5E9', text: '#2E7D32', label: 'Pago' };
      case 'pendente':
        return { bg: '#FFF9E6', text: '#B38000', label: 'Pendente' };
      case 'expirado':
        return { bg: '#FFEBEE', text: '#CC092F', label: 'Expirado' };
      default:
        return { bg: '#F5F5F5', text: '#757575', label: status };
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#F5F5F5' }}>
      <Sidebar activeMenu="home" onNavigate={onNavigate} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10" style={{ borderColor: 'var(--border)' }}>
          <div className="px-5 py-4 flex items-center justify-between">
            <div>
              <h1
                className="text-xl mb-0.5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--fg)',
                  letterSpacing: '-0.02em',
                }}
              >
                Olá, Parceiro
              </h1>
              <p className="text-xs" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)' }}>
                Bem-vindo ao seu painel executivo
              </p>
            </div>
            <button
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              style={{ color: 'var(--fg)' }}
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        <div className="p-5 space-y-5">
          {/* Hero Section - Quick Actions */}
          <section>
            <h2
              className="text-base mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--fg)',
              }}
            >
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Card A - Primary Action */}
              <motion.div
                whileHover={{
                  backgroundColor: '#FFF9E6',
                  borderColor: '#E6A600',
                  boxShadow: '0 4px 12px rgba(255, 184, 0, 0.15)'
                }}
                whileTap={{
                  backgroundColor: '#FFF9E6',
                  scale: 0.98
                }}
                className="p-4 rounded-xl cursor-pointer bg-white border-2"
                style={{
                  borderColor: 'var(--border)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--y-50)' }}
                  >
                    <Scan size={20} strokeWidth={2} style={{ color: '#0A0A0A' }} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-base mb-0.5"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: 'var(--fg)',
                      }}
                    >
                      Parcelar Boleto ou Tributo
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)' }}>
                      Transforme pagamentos à vista em parcelados
                    </p>
                  </div>
                  <ExternalLink size={16} style={{ color: 'var(--fg-muted)' }} />
                </div>
              </motion.div>

              {/* Card B - Feature Action */}
              <motion.div
                whileHover={{
                  backgroundColor: '#FFF9E6',
                  borderColor: '#E6A600',
                  boxShadow: '0 4px 12px rgba(255, 184, 0, 0.15)'
                }}
                whileTap={{
                  backgroundColor: '#FFF9E6',
                  scale: 0.98
                }}
                onClick={() => onNavigate && onNavigate('link')}
                className="p-4 rounded-xl cursor-pointer bg-white border-2"
                style={{
                  borderColor: 'var(--border)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--y-50)' }}
                  >
                    <Link2 size={20} strokeWidth={2} style={{ color: '#0A0A0A' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3
                        className="text-base"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          color: 'var(--fg)',
                        }}
                      >
                        Gerar Link de Pagamento
                      </h3>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: '#CC092F',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      >
                        Novo
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)' }}>
                      Envie cobranças pelo WhatsApp e receba em até 12x
                    </p>
                  </div>
                  <ExternalLink size={16} style={{ color: 'var(--fg-muted)' }} />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Indicators Grid */}
          <section>
            <h2
              className="text-base mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--fg)',
              }}
            >
              Desempenho do Mês
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Volume do Mês */}
              <div
                className="bg-white p-4 rounded-xl border"
                style={{
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                    <TrendingUp size={16} style={{ color: '#2E7D32' }} />
                  </div>
                  <p className="text-xs" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                    Volume do Mês
                  </p>
                </div>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: 'var(--fg)',
                  }}
                >
                  R$ 127.450
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: '#2E7D32', fontFamily: 'var(--font-sans)' }}>
                  +24% vs mês anterior
                </p>
              </div>

              {/* Links Pagos */}
              <div
                className="bg-white p-4 rounded-xl border"
                style={{
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--y-50)' }}>
                    <CheckCircle2 size={16} style={{ color: '#B38000' }} />
                  </div>
                  <p className="text-xs" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                    Links Pagos
                  </p>
                </div>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: 'var(--fg)',
                  }}
                >
                  37
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: '#B38000', fontFamily: 'var(--font-sans)' }}>
                  Taxa de conversão 82%
                </p>
              </div>

              {/* Fôlego Gerado */}
              <div
                className="bg-white p-4 rounded-xl border"
                style={{
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BarChart3 size={16} style={{ color: '#1976D2' }} />
                  </div>
                  <p className="text-xs" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                    Fôlego Gerado
                  </p>
                </div>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: 'var(--fg)',
                  }}
                >
                  R$ 89.320
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: '#1976D2', fontFamily: 'var(--font-sans)' }}>
                  Em parcelas facilitadas
                </p>
              </div>
            </div>
          </section>

          {/* Recent Activity Table */}
          <section>
            <h2
              className="text-base mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                color: 'var(--fg)',
              }}
            >
              Atividades Recentes
            </h2>
            <div
              className="bg-white rounded-xl border overflow-hidden"
              style={{
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid var(--border)' }}>
                      <th
                        className="text-left px-4 py-2.5 text-[11px]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          color: 'var(--fg-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Cliente
                      </th>
                      <th
                        className="text-left px-4 py-2.5 text-[11px]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          color: 'var(--fg-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Tipo
                      </th>
                      <th
                        className="text-left px-4 py-2.5 text-[11px]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          color: 'var(--fg-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Valor
                      </th>
                      <th
                        className="text-left px-4 py-2.5 text-[11px]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          color: 'var(--fg-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity, index) => {
                      const statusConfig = getStatusColor(activity.status);
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                          style={{ borderBottom: index < recentActivities.length - 1 ? '1px solid var(--border)' : 'none' }}
                        >
                          <td className="px-4 py-3">
                            <p
                              className="text-sm"
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 500,
                                color: 'var(--fg)',
                              }}
                            >
                              {activity.cliente}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p
                              className="text-xs"
                              style={{
                                fontFamily: 'var(--font-sans)',
                                color: 'var(--fg-muted)',
                              }}
                            >
                              {activity.tipo}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p
                              className="text-sm"
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 600,
                                color: 'var(--fg)',
                              }}
                            >
                              {activity.valor}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="inline-block px-2.5 py-1 rounded-full text-[11px]"
                              style={{
                                backgroundColor: statusConfig.bg,
                                color: statusConfig.text,
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 600,
                              }}
                            >
                              {statusConfig.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

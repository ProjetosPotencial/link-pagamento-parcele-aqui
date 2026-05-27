import { useState } from 'react';
import { Copy, MessageCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MerchantDashboardProps {
  onGenerateLink: (data: { amount: string; description: string; installments: string }) => void;
  onNavigate?: (menuId: string) => void;
}

export function MerchantDashboard({ onGenerateLink, onNavigate }: MerchantDashboardProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [installments, setInstallments] = useState('12');
  const [showOverlay, setShowOverlay] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [errors, setErrors] = useState<{ amount?: string; description?: string }>({});
  const [passFeesToCustomer, setPassFeesToCustomer] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permite apenas números, vírgula e ponto
    const regex = /^[0-9]*[,.]?[0-9]*$/;

    if (regex.test(value) || value === '') {
      // Substitui ponto por vírgula para padrão brasileiro
      const formattedValue = value.replace('.', ',');
      setAmount(formattedValue);
      if (errors.amount) setErrors({ ...errors, amount: undefined });
    } else {
      setErrors({ ...errors, amount: 'Digite apenas números' });
      setTimeout(() => {
        if (errors.amount === 'Digite apenas números') {
          setErrors({ ...errors, amount: undefined });
        }
      }, 2000);
    }
  };

  // Taxas mensais de juros por quantidade de parcelas
  const interestRates: { [key: string]: number } = {
    '1': 0,
    '2': 0,
    '3': 0,
    '6': 2.99,
    '12': 4.64,
    '18': 5.82,
    '24': 6.49,
  };

  const calculateTotalWithInterest = (baseAmount: string, installmentCount: string): number => {
    const numAmount = parseFloat(baseAmount.replace(',', '.')) || 0;
    const rate = interestRates[installmentCount] || 0;

    if (rate === 0) return numAmount;

    // Fórmula de juros compostos: M = C * (1 + i)^n
    const monthlyRate = rate / 100;
    const months = parseInt(installmentCount);
    const total = numAmount * Math.pow(1 + monthlyRate, months);

    return total;
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleGenerate = () => {
    const newErrors: { amount?: string; description?: string } = {};

    if (!amount || amount === '0,00') {
      newErrors.amount = 'Por favor, insira um valor válido';
    }

    if (!description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const link = `https://parceleaqui.com/pay/${Math.random().toString(36).substr(2, 9)}`;
    setGeneratedLink(link);
    setShowOverlay(true);
    onGenerateLink({ amount, description, installments });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Realize seu pagamento através do link: ${generatedLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: 'var(--bg-subtle)' }}>
      <Sidebar activeMenu="link" onNavigate={onNavigate} />
      {/* Main Content */}
      <main className="flex-1 md:p-12 p-4 pb-12 pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-4 sm:p-8" style={{ borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-md)' }}>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-[22px] sm:text-[28px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--fg)', marginBottom: 'var(--s-2)', letterSpacing: '-0.01em', lineHeight: '1.2' }}>
                Crie seu link de pagamento
              </h2>
              <p className="text-[14px] sm:text-[15px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--fg-muted)', lineHeight: '1.5' }}>
                Configure os detalhes e envie para seu cliente. Ele poderá parcelar com segurança e você recebe na hora.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  Valor da Cobrança <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 -translate-y-1/2" style={{ left: 'var(--s-4)', color: 'var(--fg)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px' }}>
                    R$
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0,00"
                    inputMode="decimal"
                    className={`w-full bg-white border focus:outline-none transition-all ${errors.amount ? 'border-red-500' : ''}`}
                    style={{
                      paddingLeft: '48px',
                      paddingRight: 'var(--s-4)',
                      paddingTop: 'var(--s-3)',
                      paddingBottom: 'var(--s-3)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '15px',
                      borderRadius: 'var(--r-md)',
                      color: 'var(--fg)',
                      borderColor: errors.amount ? 'var(--error)' : 'var(--border)',
                      borderWidth: '1px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--bg-brand)';
                      e.target.style.borderWidth = '1.5px';
                    }}
                    onBlur={(e) => {
                      if (!errors.amount) {
                        e.target.style.borderColor = 'var(--border)';
                        e.target.style.borderWidth = '1px';
                      }
                    }}
                  />
                </div>
                {errors.amount && (
                  <p style={{ marginTop: 'var(--s-1)', color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
                    {errors.amount}
                  </p>
                )}
                {amount && !errors.amount && (
                  <p style={{ marginTop: 'var(--s-2)', fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--g-500)', fontWeight: 500 }}>
                    Você recebe: R$ {(() => {
                      const numAmount = parseFloat(amount.replace(',', '.')) || 0;
                      // Se repassar juros ao cliente, merchant recebe integral. Se não, assume 3.99% de taxa
                      const merchantFee = passFeesToCustomer ? 0 : numAmount * 0.0399;
                      const received = numAmount - merchantFee;
                      return received.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    })()}
                  </p>
                )}
              </div>

              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  Descrição <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({ ...errors, description: undefined });
                  }}
                  placeholder="Ex: Parcelamento de IPVA 2026"
                  className={`w-full bg-white border focus:outline-none transition-all ${errors.description ? 'border-red-500' : ''}`}
                  style={{
                    padding: 'var(--s-3) var(--s-4)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    borderRadius: 'var(--r-md)',
                    color: 'var(--fg)',
                    borderColor: errors.description ? 'var(--error)' : 'var(--border)',
                    borderWidth: '1px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--bg-brand)';
                    e.target.style.borderWidth = '1.5px';
                  }}
                  onBlur={(e) => {
                    if (!errors.description) {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.borderWidth = '1px';
                    }
                  }}
                />
                {errors.description && (
                  <p style={{ marginTop: 'var(--s-1)', color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  Parcelamento Máximo
                </label>
                <div className="relative">
                  <select
                    key={`${amount}-${passFeesToCustomer}`}
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    className="w-full bg-white border focus:outline-none transition-all appearance-none cursor-pointer"
                    style={{
                      padding: 'var(--s-3) var(--s-4)',
                      paddingRight: 'var(--s-10)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      borderRadius: 'var(--r-md)',
                      color: 'var(--fg)',
                      borderColor: 'var(--border)',
                      borderWidth: '1px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--bg-brand)';
                      e.target.style.borderWidth = '1.5px';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.borderWidth = '1px';
                    }}
                  >
                  {[
                    { value: '1', label: 'À vista', rate: '0%' },
                    { value: '2', label: '2x sem juros', rate: '0%' },
                    { value: '3', label: '3x sem juros', rate: '0%' },
                    { value: '6', label: '6x com juros', rate: '2,99%' },
                    { value: '12', label: '12x com juros', rate: '4,64%' },
                    { value: '18', label: '18x com juros', rate: '5,82%' },
                    { value: '24', label: '24x com juros', rate: '6,49%' },
                  ].map((option) => {
                    const numAmount = parseFloat(amount.replace(',', '.')) || 0;
                    // Se repassar juros ao cliente, mostrar valor COM juros. Senão, mostrar valor base
                    const displayTotal = passFeesToCustomer
                      ? calculateTotalWithInterest(amount, option.value)
                      : numAmount;

                    return (
                      <option key={option.value} value={option.value}>
                        {option.label} - Valor total: R$ {formatCurrency(displayTotal)} - Taxa: {option.rate}
                      </option>
                    );
                  })}
                  </select>
                  <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none" style={{ right: 'var(--s-4)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div style={{ marginTop: 'var(--s-4)' }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#333333', fontWeight: 500 }}>
                      Repassar juros ao cliente?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setPassFeesToCustomer(!passFeesToCustomer);
                        setShowTooltip(true);
                        setTimeout(() => setShowTooltip(false), 3000);
                      }}
                      className="relative transition-all duration-200"
                      style={{
                        width: '48px',
                        height: '26px',
                        borderRadius: '13px',
                        backgroundColor: passFeesToCustomer ? 'var(--bg-brand)' : 'var(--n-300)',
                        border: '1px solid',
                        borderColor: passFeesToCustomer ? 'var(--y-600)' : 'var(--n-500)',
                      }}
                    >
                      <div
                        className="absolute transition-all duration-200"
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '10px',
                          backgroundColor: 'var(--bg)',
                          top: '2px',
                          left: passFeesToCustomer ? '25px' : '2px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                        }}
                      />
                    </button>
                  </div>
                  {showTooltip && (
                    <div className="mt-2 text-white" style={{ backgroundColor: 'var(--fg)', padding: 'var(--s-3)', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-md)', fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '1.5' }}>
                      {passFeesToCustomer
                        ? '✓ Juros repassados: O cliente pagará o valor total com juros incluídos.'
                        : '✗ Você assume os juros: O cliente paga o valor base e você arca com as taxas de parcelamento.'}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full transition-all hover:opacity-90 active:scale-[0.98]"
                style={{
                  padding: 'var(--s-4)',
                  backgroundColor: 'var(--bg-brand)',
                  color: 'var(--fg)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '16px',
                  borderRadius: 'var(--r-md)'
                }}
              >
                Gerar Link de Pagamento
              </button>

              <p style={{ marginTop: 'var(--s-3)', fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--fg-muted)', textAlign: 'center' }}>
                Link válido por 24 horas. O cliente poderá parcelar em até 12x.
              </p>
            </div>

            {/* Safe & Secure Badge */}
            <div className="border-t flex items-center justify-center" style={{ marginTop: 'var(--s-6)', paddingTop: 'var(--s-6)', borderColor: 'var(--border)', gap: 'var(--s-2)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L2 3V7C2 10.866 4.634 14.448 8 15.5C11.366 14.448 14 10.866 14 7V3L8 0Z" fill="var(--g-500)"/>
                <path d="M6.5 10.5L4 8L5.06 6.94L6.5 8.38L10.44 4.44L11.5 5.5L6.5 10.5Z" fill="white"/>
              </svg>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--fg-muted)', textAlign: 'center' }}>
                Pagamento seguro via Potencial Tecnologia | Certificado PCI DSS
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      {showOverlay && (
        <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 max-w-md sm:max-w-md">
          <div className="bg-white w-full p-4 sm:p-6" style={{ borderRadius: 'var(--r-lg)', border: '2px solid', borderColor: 'var(--bg-brand)', boxShadow: 'var(--shadow-md)' }}>
            <div className="flex items-start mb-4" style={{ gap: 'var(--s-3)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-brand)', color: 'var(--fg)' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--fg)', marginBottom: 'var(--s-2)' }}>
                  Link Gerado com Sucesso!
                </h3>
                <div style={{ backgroundColor: 'var(--bg-muted)', padding: 'var(--s-3)', marginBottom: 'var(--s-3)', borderRadius: 'var(--r-md)' }}>
                  <p className="break-all" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--fg)' }}>
                    {generatedLink}
                  </p>
                </div>
                <div className="flex" style={{ gap: 'var(--s-2)' }}>
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 flex items-center justify-center transition-all hover:opacity-90"
                    style={{
                      gap: 'var(--s-2)',
                      padding: 'var(--s-2) var(--s-3)',
                      backgroundColor: 'var(--bg-brand)',
                      color: 'var(--fg)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: 'var(--r-md)'
                    }}
                  >
                    <Copy size={16} />
                    Copiar Link
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="flex-1 flex items-center justify-center text-white transition-all hover:opacity-90"
                    style={{
                      gap: 'var(--s-2)',
                      padding: 'var(--s-2) var(--s-3)',
                      backgroundColor: '#25D366',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '14px',
                      borderRadius: 'var(--r-md)'
                    }}
                  >
                    <MessageCircle size={16} />
                    Compartilhar
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowOverlay(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Shield, ArrowLeft, AlertCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import LogoParceleAqui from '../../imports/logo_parceleAqui.png';

interface CustomerCheckoutProps {
  onNavigate?: (menuId: string) => void;
}

export function CustomerCheckout({ onNavigate }: CustomerCheckoutProps) {
  const [cardType, setCardType] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardCPF, setCardCPF] = useState('');
  const [installments, setInstallments] = useState('12');
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    cardName?: string;
    cardExpiry?: string;
    cardCVV?: string;
    cardCPF?: string;
  }>({});
  const [showError, setShowError] = useState(false);

  const totalAmount = 6633.00;
  const installmentValue = (totalAmount / 12).toFixed(2);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value.replace(/\s/g, ''));
    setCardNumber(formatted);
    if (errors.cardNumber) setErrors({ ...errors, cardNumber: undefined });
  };

  const validateCard = () => {
    const newErrors: typeof errors = {};

    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Número do cartão inválido';
    }

    if (!cardName.trim()) {
      newErrors.cardName = 'Nome do titular é obrigatório';
    }

    if (!cardExpiry || cardExpiry.length < 5) {
      newErrors.cardExpiry = 'Data de validade inválida';
    } else {
      const [month, year] = cardExpiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (parseInt(month) > 12 || parseInt(month) < 1) {
        newErrors.cardExpiry = 'Mês inválido';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.cardExpiry = 'Cartão vencido';
      }
    }

    if (!cardCVV || cardCVV.length < 3) {
      newErrors.cardCVV = 'CVV inválido';
    }

    if (!cardCPF || cardCPF.replace(/\D/g, '').length !== 11) {
      newErrors.cardCPF = 'CPF inválido';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateCard()) {
      alert('Cartão adicionado com sucesso!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: 'var(--bg-subtle)' }}>
      <Sidebar activeMenu="link" onNavigate={onNavigate} />

      <main className="flex-1 p-4 sm:p-6 sm:px-4">
        <div className="max-w-6xl mx-auto">

        {/* Error Alert */}
        {showError && Object.keys(errors).length > 0 && (
          <div className="flex items-start border" style={{ marginBottom: 'var(--s-4)', padding: 'var(--s-4)', backgroundColor: '#FEE2E2', borderColor: '#FCA5A5', gap: 'var(--s-3)', borderRadius: 'var(--r-lg)', borderWidth: '1px' }}>
            <AlertCircle className="flex-shrink-0 mt-0.5" style={{ color: 'var(--error)' }} size={20} />
            <div>
              <p style={{ color: '#991B1B', marginBottom: 'var(--s-1)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px' }}>
                Por favor, corrija os seguintes erros:
              </p>
              <ul className="space-y-1" style={{ color: '#B91C1C', fontFamily: 'var(--font-sans)', fontSize: '14px' }}>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="bg-white p-4 sm:p-6" style={{ borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-md)' }}>
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[20px] sm:text-[24px]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--fg)', marginBottom: 'var(--s-2)', letterSpacing: '-0.01em' }}>
              Formas de Pagamento
            </h2>
            <p className="text-[13px] sm:text-[14px]" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)' }}>
              Pague com até 3 cartões de crédito
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Form */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  Tipo
                </label>
                <div className="relative">
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className="w-full bg-white border focus:outline-none appearance-none cursor-pointer"
                    style={{
                      padding: 'var(--s-3) var(--s-4)',
                      paddingRight: 'var(--s-10)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      borderRadius: 'var(--r-lg)',
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
                    <option value="credit">Crédito</option>
                    <option value="debit">Débito</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  Número do Cartão
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className={`w-full bg-white border focus:outline-none transition-all ${errors.cardNumber ? '' : ''}`}
                  style={{
                    padding: 'var(--s-3) var(--s-4)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    borderRadius: 'var(--r-lg)',
                    borderColor: errors.cardNumber ? 'var(--error)' : 'var(--border)',
                    borderWidth: '1px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.cardNumber ? 'var(--error)' : 'var(--bg-brand)';
                    e.target.style.borderWidth = '1.5px';
                  }}
                  onBlur={(e) => {
                    if (!errors.cardNumber) {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.borderWidth = '1px';
                    }
                  }}
                />
                {errors.cardNumber && (
                  <p style={{ marginTop: 'var(--s-1)', color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  Nome do Titular
                </label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => {
                    setCardName(e.target.value.toUpperCase());
                    if (errors.cardName) setErrors({ ...errors, cardName: undefined });
                  }}
                  placeholder="NOME IMPRESSO NO CARTÃO"
                  className="w-full bg-white border focus:outline-none transition-all"
                  style={{
                    padding: 'var(--s-3) var(--s-4)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    borderRadius: 'var(--r-lg)',
                    borderColor: errors.cardName ? 'var(--error)' : 'var(--border)',
                    borderWidth: '1px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.cardName ? 'var(--error)' : 'var(--bg-brand)';
                    e.target.style.borderWidth = '1.5px';
                  }}
                  onBlur={(e) => {
                    if (!errors.cardName) {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.borderWidth = '1px';
                    }
                  }}
                />
                {errors.cardName && (
                  <p style={{ marginTop: 'var(--s-1)', color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
                    {errors.cardName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2" style={{ gap: 'var(--s-4)' }}>
                <div>
                  <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                    Validade
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                      }
                      setCardExpiry(value);
                      if (errors.cardExpiry) setErrors({ ...errors, cardExpiry: undefined });
                    }}
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full bg-white border focus:outline-none"
                    style={{
                      padding: 'var(--s-3) var(--s-4)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      borderRadius: 'var(--r-lg)',
                      borderColor: errors.cardExpiry ? 'var(--error)' : 'var(--border)',
                      borderWidth: '1px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = errors.cardExpiry ? 'var(--error)' : 'var(--bg-brand)';
                      e.target.style.borderWidth = '1.5px';
                    }}
                    onBlur={(e) => {
                      if (!errors.cardExpiry) {
                        e.target.style.borderColor = 'var(--border)';
                        e.target.style.borderWidth = '1px';
                      }
                    }}
                  />
                  {errors.cardExpiry && (
                    <p style={{ marginTop: 'var(--s-1)', color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
                      {errors.cardExpiry}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardCVV}
                    onChange={(e) => {
                      setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 4));
                      if (errors.cardCVV) setErrors({ ...errors, cardCVV: undefined });
                    }}
                    placeholder="000"
                    maxLength={4}
                    className="w-full bg-white border focus:outline-none"
                    style={{
                      padding: 'var(--s-3) var(--s-4)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      borderRadius: 'var(--r-lg)',
                      borderColor: errors.cardCVV ? 'var(--error)' : 'var(--border)',
                      borderWidth: '1px'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = errors.cardCVV ? 'var(--error)' : 'var(--bg-brand)';
                      e.target.style.borderWidth = '1.5px';
                    }}
                    onBlur={(e) => {
                      if (!errors.cardCVV) {
                        e.target.style.borderColor = 'var(--border)';
                        e.target.style.borderWidth = '1px';
                      }
                    }}
                  />
                  {errors.cardCVV && (
                    <p style={{ marginTop: 'var(--s-1)', color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
                      {errors.cardCVV}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  CPF do Titular
                </label>
                <input
                  type="text"
                  value={cardCPF}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 3 && value.length <= 6) {
                      value = value.slice(0, 3) + '.' + value.slice(3);
                    } else if (value.length > 6 && value.length <= 9) {
                      value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6);
                    } else if (value.length > 9) {
                      value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9, 11);
                    }
                    setCardCPF(value);
                    if (errors.cardCPF) setErrors({ ...errors, cardCPF: undefined });
                  }}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="w-full bg-white border focus:outline-none"
                  style={{
                    padding: 'var(--s-3) var(--s-4)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '16px',
                    borderRadius: 'var(--r-lg)',
                    borderColor: errors.cardCPF ? 'var(--error)' : 'var(--border)',
                    borderWidth: '1px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.cardCPF ? 'var(--error)' : 'var(--bg-brand)';
                    e.target.style.borderWidth = '1.5px';
                  }}
                  onBlur={(e) => {
                    if (!errors.cardCPF) {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.borderWidth = '1px';
                    }
                  }}
                />
                {errors.cardCPF && (
                  <p style={{ marginTop: 'var(--s-1)', color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>
                    {errors.cardCPF}
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              <div style={{ paddingTop: 'var(--s-2)' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--s-2)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--s-2)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="8" fill="var(--g-500)"/>
                      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--g-500)' }}>
                      Valor completo!
                    </span>
                  </div>
                  <span className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--fg)' }}>
                    R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="overflow-hidden" style={{ height: '6px', borderRadius: '4px', backgroundColor: 'var(--n-200)' }}>
                  <div className="h-full" style={{ width: '100%', borderRadius: '4px', backgroundColor: 'var(--g-500)' }}></div>
                </div>
              </div>

              {/* Installments */}
              <div>
                <label className="block" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#333333', marginBottom: 'var(--s-2)' }}>
                  Parcelas
                </label>
                <div className="relative">
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    className="w-full bg-white border focus:outline-none appearance-none cursor-pointer"
                    style={{
                      padding: 'var(--s-3) var(--s-4)',
                      paddingRight: 'var(--s-10)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '16px',
                      borderRadius: 'var(--r-lg)',
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
                    <option value="1">À vista - R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                    <option value="2">2x de R$ {(totalAmount / 2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                    <option value="3">3x de R$ {(totalAmount / 3).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                    <option value="6">6x de R$ {(totalAmount / 6).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                    <option value="12">12x de R$ {installmentValue}</option>
                    <option value="18">18x de R$ {(totalAmount / 18).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                    <option value="24">24x de R$ {(totalAmount / 24).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <p style={{ marginTop: 'var(--s-1)', fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'var(--fg-muted)' }}>
                  Juros de 1.99% a.m. (CET incluso)
                </p>
              </div>
            </div>

            {/* Right Column - Card Preview */}
            <div className="flex flex-col justify-center order-first lg:order-last">
              <div className="relative w-full max-w-md mx-auto aspect-[1.586] overflow-hidden mb-6 lg:mb-0" style={{ backgroundColor: 'var(--n-900)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-md)' }}>
                {/* Abstract Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -right-12 -top-12 w-64 h-64 rounded-full blur-3xl"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)', opacity: 0.24 }}
                  ></div>
                  <div
                    className="absolute -left-16 bottom-0 w-72 h-72 rounded-full blur-3xl"
                    style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', opacity: 0.16 }}
                  ></div>
                </div>

                {/* Card Content */}
                <div className="relative h-full flex flex-col justify-between text-white" style={{ padding: 'var(--s-6)' }}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center" style={{ gap: 'var(--s-3)' }}>
                      <div className="w-12 h-10 rounded" style={{ background: 'linear-gradient(135deg, var(--y-500) 0%, #FFA000 100%)' }}></div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white" opacity="0.6"/>
                        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="white" opacity="0.6"/>
                      </svg>
                    </div>
                    <span className="text-xs opacity-70" style={{ fontFamily: 'var(--font-sans)' }}>
                      {cardType === 'credit' ? 'CRÉDITO' : 'DÉBITO'}
                    </span>
                  </div>

                  <div>
                    <div style={{ marginBottom: 'var(--s-4)' }}>
                      <p className="text-xs opacity-60" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.5px', marginBottom: 'var(--s-1)' }}>
                        NÚMERO DO CARTÃO
                      </p>
                      <p className="tracking-wider" style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 500 }}>
                        {cardNumber || '•••• •••• •••• ••••'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2" style={{ gap: 'var(--s-4)' }}>
                      <div>
                        <p className="text-xs opacity-60" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.5px', marginBottom: 'var(--s-1)' }}>
                          NOME IMPRESSO NO CARTÃO
                        </p>
                        <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                          {cardName || 'SEU NOME'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-60" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.5px', marginBottom: 'var(--s-1)' }}>
                          VALIDADE
                        </p>
                        <p className="text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                          {cardExpiry || 'MM/AA'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 mt-6 lg:mt-8">
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--fg-muted)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: 'var(--fg)' }}>
                    R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="h-px" style={{ backgroundColor: 'var(--border)' }}></div>
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '16px', color: 'var(--fg)' }}>Total</span>
                  <span className="text-[18px] sm:text-[20px]" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--fg)' }}>
                    R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <button
                onClick={handleSubmit}
                className="w-full bg-transparent border-2 transition-all hover:opacity-80 active:scale-[0.98]"
                style={{
                  marginTop: 'var(--s-6)',
                  padding: 'var(--s-3)',
                  borderColor: 'var(--bg-brand)',
                  color: 'var(--bg-brand)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: 'var(--r-md)'
                }}
              >
                Adicionar cartão
              </button>

              <button
                className="w-full flex items-center justify-center transition-all hover:opacity-90 active:scale-[0.98] p-3 sm:p-4 text-[15px] sm:text-[16px]"
                style={{
                  marginTop: 'var(--s-3)',
                  backgroundColor: 'var(--bg-brand)',
                  color: 'var(--fg)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  borderRadius: 'var(--r-md)',
                  gap: 'var(--s-2)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L2 3V7C2 10.866 4.634 14.448 8 15.5C11.366 14.448 14 10.866 14 7V3L8 0Z" fill="var(--g-500)"/>
                  <path d="M6.5 10.5L4 8L5.06 6.94L6.5 8.38L10.44 4.44L11.5 5.5L6.5 10.5Z" fill="white"/>
                </svg>
                <span className="hidden sm:inline">Finalizar Pagamento Seguro</span>
                <span className="sm:hidden">Finalizar Pagamento</span>
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center" style={{ marginTop: 'var(--s-4)', gap: 'var(--s-2)' }}>
                <p style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-sans)', fontSize: '12px', textAlign: 'center' }}>
                  Pagamento seguro via Potencial Tecnologia | Certificado PCI DSS
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

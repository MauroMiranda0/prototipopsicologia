import React, { useState } from 'react';
import { ScreenId, TransitionType, PaymentRecord } from '../types';
import { SidebarNav } from './SidebarNav';
import { MobileBottomNav } from './MobileBottomNav';
import { INITIAL_PAYMENTS, LOGO_IMG } from '../data/mockData';

interface PagosPanelProps {
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}

export const PagosPanel: React.FC<PagosPanelProps> = ({ navigateTo }) => {
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [filterTab, setFilterTab] = useState<'Todos' | 'Pagado' | 'Pendiente' | 'Cancelado'>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  // New payment fields
  const [patientName, setPatientName] = useState('');
  const [concept, setConcept] = useState('Terapia Individual');
  const [amount, setAmount] = useState('600');
  const [method, setMethod] = useState<'Transferencia' | 'Tarjeta de crédito' | 'Efectivo'>('Transferencia');
  const [status, setStatus] = useState<'Pagado' | 'Pendiente'>('Pagado');

  const filteredPayments = payments.filter((pay) => {
    const matchesTab = filterTab === 'Todos' || pay.status === filterTab;
    const matchesSearch =
      pay.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.amount.toString().includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) return;

    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      date: '25 Mayo, 2025',
      patientName,
      concept,
      amount: parseFloat(amount) || 0,
      status,
      method,
    };

    setPayments([newPayment, ...payments]);
    setShowAddModal(false);
    setPatientName('');
  };

  const handleToggleStatus = (id: string) => {
    setPayments(
      payments.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === 'Pagado' ? 'Pendiente' : 'Pagado',
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#201b14] font-body-md flex antialiased selection:bg-[#5e5d3f]/20">
      {/* Side Navigation */}
      <SidebarNav currentScreen="pagos" navigateTo={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#fff8f3] relative">
        {/* Subtle background decoration */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237e5d41' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Mobile Header */}
        <header className="md:hidden bg-[#fff8f3]/90 backdrop-blur-md shadow-sm sticky top-0 z-30 px-4 py-3 flex items-center justify-between border-b border-[#c9c7ba]/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('landing', 'push_back')}
              className="w-9 h-9 rounded-full overflow-hidden border border-[#5e5d3f]/30"
            >
              <img alt="Logo" className="w-full h-full object-cover" src={LOGO_IMG} />
            </button>
            <h2 className="font-headline-md text-2xl text-[#5e5d3f]">Pagos</h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#5e5d3f] text-white px-3 py-1.5 rounded-full text-xs font-label-md flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Pago
          </button>
        </header>

        {/* Page Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative z-10">
          <div className="max-w-[1400px] mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#c9c7ba]/30 pb-6">
              <div>
                <h2 className="font-headline-lg text-3xl md:text-4xl text-[#201b14] font-medium">
                  Pagos
                </h2>
                <p className="font-body-md text-sm text-[#48473d] mt-1">
                  Control de pagos y facturación
                </p>
              </div>
              <button
                id="nuevo-pago-btn"
                onClick={() => setShowAddModal(true)}
                className="bg-[#5e5d3f] hover:bg-[#777656] text-white px-6 py-2.5 rounded-full font-label-md text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Nuevo pago
              </button>
            </div>

            {/* KPI Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Metric 1 */}
              <div className="bg-white/80 backdrop-blur ambient-shadow rounded-2xl p-6 flex items-center gap-4 border-t-4 border-t-[#777656] transition-transform hover:-translate-y-1 border border-[#ece1d5]">
                <div className="w-12 h-12 rounded-full bg-[#fef2e5] flex items-center justify-center text-[#5e5d3f] shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </div>
                <div>
                  <p className="font-label-md text-xs text-[#48473d] font-semibold">Ingresos del Mes</p>
                  <p className="font-headline-md text-2xl text-[#201b14] font-semibold mt-0.5">$24,000</p>
                  <p className="text-xs text-[#78583c] mt-1 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    +15% vs mes anterior
                  </p>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-white/80 backdrop-blur ambient-shadow rounded-2xl p-6 flex items-center gap-4 border-t-4 border-t-[#8c704b] transition-transform hover:-translate-y-1 border border-[#ece1d5]">
                <div className="w-12 h-12 rounded-full bg-[#fef2e5] flex items-center justify-center text-[#715735] shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-2xl">schedule</span>
                </div>
                <div>
                  <p className="font-label-md text-xs text-[#48473d] font-semibold">Pagos Pendientes</p>
                  <p className="font-headline-md text-2xl text-[#201b14] font-semibold mt-0.5">$3,250</p>
                  <p className="text-xs text-[#48473d] mt-1">5 pendientes</p>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-white/80 backdrop-blur ambient-shadow rounded-2xl p-6 flex items-center gap-4 border-t-4 border-t-[#fed2af] transition-transform hover:-translate-y-1 border border-[#ece1d5]">
                <div className="w-12 h-12 rounded-full bg-[#fef2e5] flex items-center justify-center text-[#78583c] shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-2xl">person</span>
                </div>
                <div>
                  <p className="font-label-md text-xs text-[#48473d] font-semibold">Total Pacientes</p>
                  <p className="font-headline-md text-2xl text-[#201b14] font-semibold mt-0.5">46</p>
                  <p className="text-xs text-[#48473d] mt-1">Activos esta semana</p>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-white/80 backdrop-blur ambient-shadow rounded-2xl p-6 flex items-center gap-4 border-t-4 border-t-[#79776c] transition-transform hover:-translate-y-1 border border-[#ece1d5]">
                <div className="w-12 h-12 rounded-full bg-[#fef2e5] flex items-center justify-center text-[#5e5d3f] shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-2xl">bar_chart</span>
                </div>
                <div>
                  <p className="font-label-md text-xs text-[#48473d] font-semibold">Ingresos Totales</p>
                  <p className="font-headline-md text-2xl text-[#201b14] font-semibold mt-0.5">$125,400</p>
                  <p className="text-xs text-[#48473d] mt-1">Año en curso</p>
                </div>
              </div>
            </div>

            {/* Main Table Section */}
            <div className="bg-white ambient-shadow rounded-2xl border border-[#c9c7ba]/30 flex flex-col overflow-hidden">
              {/* Filters & Search Toolbar */}
              <div className="p-4 md:p-6 border-b border-[#c9c7ba]/30 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                  {(['Todos', 'Pagado', 'Pendiente', 'Cancelado'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilterTab(tab)}
                      className={`px-4 py-2 rounded-full font-label-md text-xs font-semibold transition-all cursor-pointer ${
                        filterTab === tab
                          ? 'bg-[#fed2af] text-[#79583d] shadow-sm'
                          : 'text-[#48473d] hover:bg-[#ece1d5]'
                      }`}
                    >
                      {tab === 'Pagado' ? 'Pagados' : tab === 'Pendiente' ? 'Pendientes' : tab === 'Cancelado' ? 'Cancelados' : 'Todos'}
                    </button>
                  ))}
                </div>

                {/* Search & Filter Actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <div className="relative flex-1 lg:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#48473d] opacity-70 text-lg">
                      search
                    </span>
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#ece1d5]/50 border border-[#c9c7ba]/60 rounded-full focus:ring-2 focus:ring-[#5e5d3f] focus:border-transparent text-xs placeholder:text-[#48473d]/50 transition-all font-body-md text-[#201b14]"
                      placeholder="Buscar pago..."
                      type="text"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const nextTab = filterTab === 'Todos' ? 'Pagado' : filterTab === 'Pagado' ? 'Pendiente' : 'Todos';
                      setFilterTab(nextTab);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 border border-[#79776c] text-[#201b14] rounded-full hover:bg-[#ece1d5] transition-colors font-label-md text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    <span>Filtros</span>
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="bg-[#fff8f3] border-b border-[#c9c7ba]/30">
                      <th className="px-6 py-4 font-label-md text-xs text-[#48473d] whitespace-nowrap font-semibold">
                        Fecha
                      </th>
                      <th className="px-6 py-4 font-label-md text-xs text-[#48473d] whitespace-nowrap font-semibold">
                        Paciente
                      </th>
                      <th className="px-6 py-4 font-label-md text-xs text-[#48473d] whitespace-nowrap font-semibold">
                        Concepto
                      </th>
                      <th className="px-6 py-4 font-label-md text-xs text-[#48473d] whitespace-nowrap font-semibold">
                        Monto
                      </th>
                      <th className="px-6 py-4 font-label-md text-xs text-[#48473d] whitespace-nowrap font-semibold">
                        Estado
                      </th>
                      <th className="px-6 py-4 font-label-md text-xs text-[#48473d] whitespace-nowrap font-semibold">
                        Método de pago
                      </th>
                      <th className="px-6 py-4 font-label-md text-xs text-[#48473d] text-right whitespace-nowrap font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c9c7ba]/20">
                    {filteredPayments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-[#ece1d5]/30 transition-colors">
                        <td className="px-6 py-4 font-body-md text-xs text-[#201b14] whitespace-nowrap">
                          {pay.date}
                        </td>
                        <td className="px-6 py-4 font-body-md text-sm text-[#201b14] whitespace-nowrap font-medium">
                          {pay.patientName}
                        </td>
                        <td className="px-6 py-4 font-body-md text-xs text-[#48473d] whitespace-nowrap">
                          {pay.concept}
                        </td>
                        <td className="px-6 py-4 font-body-md text-sm text-[#201b14] whitespace-nowrap font-bold">
                          ${pay.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                              pay.status === 'Pagado'
                                ? 'bg-[#cfc7ab]/40 text-[#49482c] border-[#cfc7ab]'
                                : pay.status === 'Pendiente'
                                ? 'bg-[#e8c59a]/40 text-[#5e4027] border-[#e8c59a]'
                                : 'bg-[#ffdad6] text-[#93000a] border-[#ffdad6]'
                            }`}
                          >
                            {pay.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-body-md text-xs text-[#48473d] whitespace-nowrap">
                          {pay.method}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => setSelectedPayment(pay)}
                            className="text-[#48473d] hover:text-[#5e5d3f] transition-colors p-1 cursor-pointer"
                            title="Ver detalle"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                          <button
                            onClick={() => handleToggleStatus(pay.id)}
                            className="text-[#48473d] hover:text-[#5e5d3f] transition-colors p-1 cursor-pointer"
                            title={pay.status === 'Pagado' ? 'Marcar pendiente' : 'Registrar pago'}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {pay.status === 'Pagado' ? 'download' : 'check_circle'}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 md:p-6 border-t border-[#c9c7ba]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs bg-[#fff8f3]/50">
                <span className="text-[#48473d] font-body-md">
                  Mostrando 1 a {filteredPayments.length} de 15 pagos
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#48473d] hover:bg-[#ece1d5] transition-colors disabled:opacity-50"
                    disabled
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#fed2af] text-[#79583d] font-bold shadow-sm">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#48473d] hover:bg-[#ece1d5] transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#48473d] hover:bg-[#ece1d5] transition-colors">
                    3
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#48473d] hover:bg-[#ece1d5] transition-colors">
                    4
                  </button>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#48473d] hover:bg-[#ece1d5] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacing for mobile */}
          <div className="h-24 md:h-8"></div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentScreen="pagos" navigateTo={navigateTo} />

      {/* New Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#c9c7ba]/30">
            <div className="flex justify-between items-center pb-4 border-b border-[#c9c7ba]/30 mb-4">
              <h3 className="font-headline-md text-xl text-[#78583c] font-medium">Registrar Pago</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#48473d] hover:text-[#201b14] p-1 rounded-full hover:bg-[#ece1d5]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Paciente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Laura Torras Vega"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Concepto</label>
                <input
                  type="text"
                  required
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label-md text-[#48473d] mb-1">Monto ($)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label-md text-[#48473d] mb-1">Estado</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                  >
                    <option value="Pagado">Pagado</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Método de Pago</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                >
                  <option value="Transferencia">Transferencia</option>
                  <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                  <option value="Efectivo">Efectivo</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-label-md rounded-full text-[#48473d] hover:bg-[#ece1d5]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-label-md bg-[#5e5d3f] hover:bg-[#777656] text-white rounded-full shadow-sm"
                >
                  Guardar Pago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-[#c9c7ba]/30">
            <div className="flex justify-between items-center pb-3 border-b border-[#c9c7ba]/30 mb-4">
              <span className="font-headline-md text-lg text-[#78583c]">Comprobante de Pago</span>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-[#48473d] hover:text-[#201b14] p-1 rounded-full hover:bg-[#ece1d5]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#48473d]">Paciente:</span>
                <span className="font-semibold text-[#201b14]">{selectedPayment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Fecha:</span>
                <span className="text-[#201b14]">{selectedPayment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Concepto:</span>
                <span className="text-[#201b14]">{selectedPayment.concept}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Monto:</span>
                <span className="font-bold text-[#5e5d3f] text-base">${selectedPayment.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Método:</span>
                <span className="text-[#201b14]">{selectedPayment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Estado:</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    selectedPayment.status === 'Pagado'
                      ? 'bg-[#cac8a3]/40 text-[#49482c]'
                      : 'bg-[#fed2af] text-[#79583d]'
                  }`}
                >
                  {selectedPayment.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  alert('Comprobante descargado exitosamente');
                  setSelectedPayment(null);
                }}
                className="px-4 py-2 text-xs font-label-md bg-[#78583c] text-white rounded-full"
              >
                Descargar Recibo
              </button>
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 text-xs font-label-md text-[#48473d] hover:bg-[#ece1d5] rounded-full"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

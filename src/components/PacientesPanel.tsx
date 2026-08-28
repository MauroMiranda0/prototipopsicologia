import React, { useState } from 'react';
import { ScreenId, TransitionType, Patient } from '../types';
import { SidebarNav } from './SidebarNav';
import { MobileBottomNav } from './MobileBottomNav';
import { INITIAL_PATIENTS, THERAPIST_AVATAR } from '../data/mockData';

interface PacientesPanelProps {
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}

export const PacientesPanel: React.FC<PacientesPanelProps> = ({ navigateTo }) => {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Activo' | 'Inactivo'>('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // New patient form
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTherapy, setNewTherapy] = useState('Terapia Individual');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'Todos' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const initials = newName
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');

    const newPatientObj: Patient = {
      id: `p_${Date.now()}`,
      name: newName,
      initials: initials || 'PX',
      email: newEmail || 'paciente@email.com',
      phone: newPhone || '(114) 000 0000',
      lastSession: 'Hoy',
      status: 'Activo',
      therapyType: newTherapy,
    };

    setPatients([newPatientObj, ...patients]);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id));
    if (selectedPatient?.id === id) setSelectedPatient(null);
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#201b14] font-body-md flex antialiased selection:bg-[#5e5d3f]/20">
      {/* Sidebar */}
      <SidebarNav currentScreen="pacientes" navigateTo={navigateTo} />

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top App Bar for Mobile */}
        <header className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-[#fff8f3]/90 backdrop-blur-md sticky top-0 z-30 border-b border-[#c9c7ba]/30 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-headline-md text-2xl text-[#5e5d3f] font-medium">Pacientes</span>
          </div>
          <button
            onClick={() => navigateTo('landing', 'push_back')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#5e5d3f]/20"
          >
            <img className="w-full h-full object-cover" alt="Therapist avatar" src={THERAPIST_AVATAR} />
          </button>
        </header>

        {/* Content Canvas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-10 bg-[#fff8f3]">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-headline-lg text-3xl md:text-4xl text-[#201b14] mb-1 font-medium">
                  Pacientes
                </h1>
                <p className="font-body-md text-sm text-[#48473d]">
                  Administra la información de tus pacientes
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#79776c] text-lg pointer-events-none">
                    search
                  </span>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#ece1d5]/50 border border-[#c9c7ba] rounded-full pl-10 pr-4 py-2 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f] focus:border-transparent transition-all placeholder:text-[#79776c]/70 text-[#201b14]"
                    placeholder="Buscar paciente..."
                    type="text"
                  />
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => {
                    const nextStatus = statusFilter === 'Todos' ? 'Activo' : statusFilter === 'Activo' ? 'Inactivo' : 'Todos';
                    setStatusFilter(nextStatus);
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-[#c9c7ba] rounded-full text-[#48473d] hover:bg-[#ece1d5] transition-colors font-label-md text-xs font-semibold bg-white/50 backdrop-blur cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">filter_list</span>
                  Filtros: {statusFilter}
                </button>

                {/* Primary Action Button */}
                <button
                  id="nuevo-paciente-btn"
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#5e5d3f] hover:bg-[#777656] text-white rounded-full transition-all shadow-sm font-label-md text-xs font-semibold cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Nuevo paciente
                </button>
              </div>
            </div>

            {/* Data Table Card */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(126,93,65,0.08)] border border-[#ece1d5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#fef2e5] border-b border-[#ece1d5]">
                      <th className="py-4 px-6 font-label-md text-xs text-[#48473d] font-semibold tracking-wider">
                        Nombre
                      </th>
                      <th className="py-4 px-6 font-label-md text-xs text-[#48473d] font-semibold tracking-wider">
                        Contacto
                      </th>
                      <th className="py-4 px-6 font-label-md text-xs text-[#48473d] font-semibold tracking-wider">
                        Última sesión
                      </th>
                      <th className="py-4 px-6 font-label-md text-xs text-[#48473d] font-semibold tracking-wider">
                        Estado
                      </th>
                      <th className="py-4 px-6 font-label-md text-xs text-[#48473d] font-semibold tracking-wider">
                        Terapia principal
                      </th>
                      <th className="py-4 px-6 font-label-md text-xs text-[#48473d] font-semibold tracking-wider text-right">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ece1d5]">
                    {filteredPatients.map((p) => (
                      <tr key={p.id} className="hover:bg-[#fff8f3]/80 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            {p.avatar ? (
                              <div className="w-10 h-10 rounded-full bg-[#ece1d5] flex items-center justify-center shrink-0 border border-[#c9c7ba] overflow-hidden">
                                <img
                                  className="w-full h-full object-cover"
                                  alt={p.name}
                                  src={p.avatar}
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#fed2af] text-[#79583d] flex items-center justify-center font-bold text-xs shrink-0 border border-[#78583c]/20">
                                {p.initials}
                              </div>
                            )}
                            <span className="font-body-md text-sm text-[#201b14] font-medium">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-body-md text-xs text-[#201b14] font-medium">{p.email}</span>
                            <span className="font-body-md text-xs text-[#48473d]">{p.phone}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-body-md text-xs text-[#48473d]">
                          {p.lastSession}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                              p.status === 'Activo'
                                ? 'bg-[#cac8a3]/30 text-[#49482c] border-[#5e5d3f]/20'
                                : 'bg-[#ece1d5] text-[#48473d] border-[#c9c7ba]'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-body-md text-xs text-[#48473d]">
                          {p.therapyType}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setSelectedPatient(p)}
                              className="p-1.5 text-[#48473d] hover:text-[#5e5d3f] hover:bg-[#ece1d5] rounded-md transition-colors cursor-pointer"
                              title="Ver detalles"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                            <button
                              onClick={() => {
                                const newPName = prompt('Editar nombre del paciente:', p.name);
                                if (newPName) {
                                  setPatients(
                                    patients.map((pat) => (pat.id === p.id ? { ...pat, name: newPName } : pat))
                                  );
                                }
                              }}
                              className="p-1.5 text-[#48473d] hover:text-[#5e5d3f] hover:bg-[#ece1d5] rounded-md transition-colors cursor-pointer"
                              title="Editar"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeletePatient(p.id)}
                              className="p-1.5 text-[#48473d] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/50 rounded-md transition-colors cursor-pointer"
                              title="Eliminar"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-[#fef2e5] border-t border-[#ece1d5] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-body-md text-xs text-[#48473d]">
                  Mostrando 1 a {filteredPatients.length} de 24 pacientes
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md text-[#48473d] hover:bg-[#ece1d5] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-[#78583c] text-white font-semibold text-xs shadow-sm">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#48473d] hover:bg-[#ece1d5] font-medium text-xs transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#48473d] hover:bg-[#ece1d5] font-medium text-xs transition-colors">
                    3
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#48473d] hover:bg-[#ece1d5] font-medium text-xs transition-colors">
                    4
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#48473d] hover:bg-[#ece1d5] font-medium text-xs transition-colors">
                    5
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#48473d] hover:bg-[#ece1d5] transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom spacer for mobile */}
          <div className="h-24 md:h-8"></div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentScreen="pacientes" navigateTo={navigateTo} />

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#c9c7ba]/30">
            <div className="flex justify-between items-center pb-4 border-b border-[#c9c7ba]/30 mb-4">
              <h3 className="font-headline-md text-xl text-[#78583c] font-medium">Nuevo Paciente</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#48473d] hover:text-[#201b14] p-1 rounded-full hover:bg-[#ece1d5]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sofia Valentina Ruiz"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="sofia@email.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Teléfono</label>
                <input
                  type="tel"
                  placeholder="(114) 555 1234"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Terapia Principal</label>
                <select
                  value={newTherapy}
                  onChange={(e) => setNewTherapy(e.target.value)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                >
                  <option value="Terapia Individual">Terapia Individual</option>
                  <option value="Terapia de Pareja">Terapia de Pareja</option>
                  <option value="Taller de Relajación">Taller de Relajación</option>
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
                  Guardar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-[#c9c7ba]/30">
            <div className="flex justify-between items-center pb-3 border-b border-[#c9c7ba]/30 mb-4">
              <span className="font-headline-md text-lg text-[#78583c]">Ficha de Paciente</span>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-[#48473d] hover:text-[#201b14] p-1 rounded-full hover:bg-[#ece1d5]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#48473d]">Nombre:</span>
                <span className="font-semibold text-[#201b14]">{selectedPatient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Email:</span>
                <span className="text-[#201b14]">{selectedPatient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Teléfono:</span>
                <span className="text-[#201b14]">{selectedPatient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Terapia:</span>
                <span className="font-semibold text-[#5e5d3f]">{selectedPatient.therapyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Última Sesión:</span>
                <span className="text-[#201b14]">{selectedPatient.lastSession}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Estado:</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#cac8a3]/40 text-[#49482c] font-medium">
                  {selectedPatient.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-5 py-2 text-xs font-label-md bg-[#5e5d3f] text-white rounded-full"
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

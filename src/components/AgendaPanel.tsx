import React, { useState } from 'react';
import { ScreenId, TransitionType, Appointment } from '../types';
import { SidebarNav } from './SidebarNav';
import { MobileBottomNav } from './MobileBottomNav';
import { INITIAL_APPOINTMENTS, LOGO_IMG } from '../data/mockData';

interface AgendaPanelProps {
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}

export const AgendaPanel: React.FC<AgendaPanelProps> = ({ navigateTo }) => {
  const [viewMode, setViewMode] = useState<'dia' | 'semana' | 'mes'>('semana');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // New appointment form state
  const [patientName, setPatientName] = useState('');
  const [therapyType, setTherapyType] = useState<'Individual' | 'Pareja' | 'Taller / Grupo' | 'Bloqueado'>('Individual');
  const [dayIndex, setDayIndex] = useState(0);
  const [time, setTime] = useState('10:00');

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName) return;

    const hour = parseInt(time.split(':')[0], 10) || 10;
    const topPx = (hour - 8) * 40;

    const newApp: Appointment = {
      id: `a_${Date.now()}`,
      patientName,
      therapyType,
      date: '2025-05-20',
      time,
      durationMinutes: 60,
      dayIndex,
      hourSlot: hour,
      topOffsetPx: topPx,
      status: 'confirmada',
    };

    setAppointments([...appointments, newApp]);
    setShowNewModal(false);
    setPatientName('');
  };

  const days = [
    { label: 'Lun 19', index: 0 },
    { label: 'Mar 20', index: 1 },
    { label: 'Mié 21', index: 2 },
    { label: 'Jue 22', index: 3 },
    { label: 'Vie 23', index: 4 },
    { label: 'Sáb 24', index: 5 },
    { label: 'Dom 25', index: 6 },
  ];

  const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00'
  ];

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'Pareja':
        return 'bg-[#fed2af]/70 border-[#78583c] text-[#201b14]';
      case 'Taller / Grupo':
        return 'bg-[#cac8a3]/50 border-[#777656] text-[#201b14]';
      case 'Bloqueado':
        return 'bg-[#ece1d5] border-[#c9c7ba] text-[#48473d]';
      case 'Individual':
      default:
        return 'bg-[#ece1d5] border-[#5e5d3f] text-[#201b14]';
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#201b14] font-body-md flex antialiased">
      {/* Sidebar Navigation */}
      <SidebarNav currentScreen="agenda" navigateTo={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fff8f3]">
        {/* Mobile Header */}
        <header className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-[#fff8f3]/90 backdrop-blur-md sticky top-0 z-30 border-b border-[#c9c7ba]/30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('landing', 'push_back')}
              className="text-[#48473d] p-1.5 rounded-full hover:bg-[#ece1d5] transition-colors"
            >
              <img src={LOGO_IMG} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            </button>
            <span className="font-headline-md text-xl text-[#5e5d3f] font-medium">Agenda</span>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-[#5e5d3f] text-white px-3.5 py-1.5 rounded-full text-xs font-label-md flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Cita
          </button>
        </header>

        {/* Desktop Header Area */}
        <div className="px-6 md:px-10 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-3xl md:text-4xl text-[#201b14] font-medium">Agenda</h1>
            <p className="font-body-md text-sm text-[#48473d] mt-1">Gestiona tus citas y disponibilidad</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="nueva-cita-btn"
              onClick={() => setShowNewModal(true)}
              className="bg-[#5e5d3f] hover:bg-[#777656] text-white px-6 py-2.5 rounded-full font-label-md text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Nueva cita
            </button>
          </div>
        </div>

        {/* Calendar Toolbar */}
        <div className="px-6 md:px-10 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#c9c7ba]/25">
          {/* View Toggles */}
          <div className="flex bg-[#f2e6da] rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setViewMode('dia')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs font-semibold transition-all ${
                viewMode === 'dia' ? 'bg-white text-[#201b14] shadow-sm' : 'text-[#48473d] hover:bg-[#ece1d5]'
              }`}
            >
              Día
            </button>
            <button
              onClick={() => setViewMode('semana')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs font-semibold transition-all ${
                viewMode === 'semana' ? 'bg-white text-[#201b14] shadow-sm' : 'text-[#48473d] hover:bg-[#ece1d5]'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode('mes')}
              className={`px-4 py-1.5 rounded-lg font-label-md text-xs font-semibold transition-all ${
                viewMode === 'mes' ? 'bg-white text-[#201b14] shadow-sm' : 'text-[#48473d] hover:bg-[#ece1d5]'
              }`}
            >
              Mes
            </button>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <button
                className="p-2 rounded-full hover:bg-[#ece1d5] text-[#48473d] transition-colors flex items-center justify-center cursor-pointer"
                title="Semana anterior"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                className="p-2 rounded-full hover:bg-[#ece1d5] text-[#48473d] transition-colors flex items-center justify-center cursor-pointer"
                title="Semana siguiente"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <h3 className="font-title-lg text-lg text-[#201b14] font-semibold min-w-[180px] text-center">
              19 - 25 Mayo, 2025
            </h3>
            <button className="p-1 text-[#48473d] hover:text-[#5e5d3f] transition-colors flex items-center cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">expand_more</span>
            </button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="flex-1 overflow-auto bg-white px-4 py-4 m-4 md:m-6 rounded-2xl shadow-sm border border-[#c9c7ba]/25">
          {/* Day Headers */}
          <div className="grid grid-cols-8 min-w-[760px] border-b border-[#c9c7ba]/25 pb-3">
            <div className="text-center font-label-md text-[#48473d] text-xs"></div>
            {days.map((d) => (
              <div key={d.label} className="text-center font-label-md text-xs font-semibold text-[#48473d]">
                {d.label}
              </div>
            ))}
          </div>

          {/* Time & Event Grid */}
          <div className="relative mt-2 grid grid-cols-8 min-w-[760px] gap-x-2">
            {/* Time Column */}
            <div className="flex flex-col text-right pr-3 font-label-md text-[#48473d] text-xs opacity-75 select-none">
              {hours.map((hr) => (
                <div key={hr} className="h-[40px] flex items-start justify-end">
                  {hr}
                </div>
              ))}
            </div>

            {/* 7 Day Columns */}
            {days.map((d) => {
              const dayAppointments = appointments.filter((a) => a.dayIndex === d.index);
              return (
                <div key={d.index} className="relative border-l border-[#c9c7ba]/20 h-[480px]">
                  {dayAppointments.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedAppointment(app)}
                      style={{ top: `${app.topOffsetPx}px` }}
                      className={`absolute left-1 right-1 border-l-4 rounded-lg p-2 shadow-sm text-xs cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all z-10 ${getEventStyle(
                        app.therapyType
                      )}`}
                    >
                      <div className="font-bold">{app.time}</div>
                      <div className="font-medium truncate">{app.patientName}</div>
                      <div className="opacity-80 text-[11px] truncate">{app.therapyType}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="px-6 md:px-10 pb-20 md:pb-6 flex flex-wrap gap-6 items-center justify-center text-xs font-label-md">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#5e5d3f]"></div>
            <span className="text-[#48473d]">Individual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#78583c]"></div>
            <span className="text-[#48473d]">Pareja</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#777656]"></div>
            <span className="text-[#48473d]">Taller / Grupo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ece1d5] border border-[#c9c7ba]"></div>
            <span className="text-[#48473d]">Bloqueado</span>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentScreen="agenda" navigateTo={navigateTo} />

      {/* New Appointment Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-[#c9c7ba]/30">
            <div className="flex justify-between items-center pb-4 border-b border-[#c9c7ba]/30 mb-4">
              <h3 className="font-headline-md text-xl text-[#78583c] font-medium">Nueva Cita</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-[#48473d] hover:text-[#201b14] p-1 rounded-full hover:bg-[#ece1d5]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Nombre del Paciente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sofia Martínez"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-[#48473d] mb-1">Tipo de Terapia</label>
                <select
                  value={therapyType}
                  onChange={(e) => setTherapyType(e.target.value as any)}
                  className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                >
                  <option value="Individual">Individual</option>
                  <option value="Pareja">Pareja</option>
                  <option value="Taller / Grupo">Taller / Grupo</option>
                  <option value="Bloqueado">Bloqueado</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-label-md text-[#48473d] mb-1">Día</label>
                  <select
                    value={dayIndex}
                    onChange={(e) => setDayIndex(parseInt(e.target.value, 10))}
                    className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                  >
                    {days.map((d) => (
                      <option key={d.index} value={d.index}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label-md text-[#48473d] mb-1">Hora</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#fef2e5]/50 border border-[#c9c7ba] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5e5d3f]"
                  >
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-xs font-label-md rounded-full text-[#48473d] hover:bg-[#ece1d5]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-label-md bg-[#5e5d3f] hover:bg-[#777656] text-white rounded-full shadow-sm"
                >
                  Guardar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-[#c9c7ba]/30">
            <div className="flex justify-between items-center pb-3 border-b border-[#c9c7ba]/30 mb-4">
              <span className="font-headline-md text-lg text-[#78583c]">Detalle de Consulta</span>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-[#48473d] hover:text-[#201b14] p-1 rounded-full hover:bg-[#ece1d5]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#48473d]">Paciente:</span>
                <span className="font-semibold text-[#201b14]">{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Tipo:</span>
                <span className="font-semibold text-[#5e5d3f]">{selectedAppointment.therapyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Hora:</span>
                <span className="font-semibold text-[#201b14]">{selectedAppointment.time} (60 min)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#48473d]">Estado:</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#cac8a3]/40 text-[#49482c] font-medium">
                  {selectedAppointment.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setAppointments(appointments.filter((a) => a.id !== selectedAppointment.id));
                  setSelectedAppointment(null);
                }}
                className="px-4 py-2 text-xs font-label-md text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-full"
              >
                Eliminar
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
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

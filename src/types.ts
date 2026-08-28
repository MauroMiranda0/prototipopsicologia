export type ScreenId =
  | 'landing'
  | 'login'
  | 'agenda'
  | 'pacientes'
  | 'pagos';

export type TransitionType = 'slide_up' | 'push' | 'push_back' | 'none';

export interface Patient {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  lastSession: string;
  status: 'Activo' | 'Inactivo';
  therapyType: string;
  avatar?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  therapyType: 'Individual' | 'Pareja' | 'Taller / Grupo' | 'Bloqueado';
  date: string; // YYYY-MM-DD or day name
  time: string; // e.g. "13:00"
  durationMinutes: number;
  dayIndex: number; // 0 for Lun, 1 for Mar, etc.
  hourSlot: number; // 8 to 19
  topOffsetPx: number;
  status: 'confirmada' | 'pendiente' | 'completada';
}

export interface PaymentRecord {
  id: string;
  date: string;
  patientName: string;
  concept: string;
  amount: number;
  status: 'Pagado' | 'Pendiente' | 'Cancelado';
  method: 'Transferencia' | 'Tarjeta de crédito' | 'Efectivo';
}

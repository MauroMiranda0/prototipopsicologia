import { Patient, Appointment, PaymentRecord } from '../types';

export const LOGO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCotbM8SakDV6vtngmxsdgeXRSBiUqBsdeuUki-yXpXKBht57_B5NdRAtlTWtltUyawpzYcvZITWmRhtjvG72LYeCYguwElNEWcN_APVnY07PZQdzKJIBKivwm_XDCYoQrWqbkPcZqxpzjOngjDDEAP4lr6m4a4AXyeL_R20dAz8O7wDKpOHh6WDqIkflyPZQXPDyeIHTkoODCxJ30VYAA4GG6T2VKNfHHDIPk1TDLJ6JDZxSVSuX-u';

export const HERO_ILLUSTRATION = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgyM6rmphBJZZ9XodhLjR_L3Xx7mgCWR_-NNDdzUf1lI9qAd7eWgh6477lOKucFQMNu0K5Gd0muDuyggn-6MS1GwaBvc2xAhH6jDN_jcU_qIXqUVqFAqsm2y02SUQK6T19PrEvQCeBRJwTzGwD_rcubnONjsILQMV__wj-jHpPDekDO8UiesPxR5Ku6ZISIbRfssDoeMwh_Al2TVHFpWR7jUdv2PbK4Uofyp5CX2jPios2K6BG5LYNwyYFBua4ISKwHg';

export const BANNER_MEDITATION = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqpgx05bEEbItyzJLxIg6gxCYa4Xmn53nsHzx5JD3X1ZPJhnQ3poQ5SXbrB0CLQNHsjgT-frid9QGMA-CE04n6Wev6QeTNd5OvZIG3x5tDOJNDbzPPZJqLe15sMBwxU9YH-wtZRdAjqQ4ZO5Oei4Wun2wrypngyuKcGHkU2ejJDRl5XkD3-RxXPfZPOeh_evHhCRn_7ZKfU9eRQyZyGoJ_BpVINSpETNqkN9v92iGUMkzpYT922PNQ';

export const THERAPIST_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVa-BaxdbCKgLF7537RXR8IctXAUWxdFGiGCKAnXTN90Lg7veGMBD7EWeGQRwU3aj4hJhp0mowFFpX05_lXJUUCDMNP8kzaSOZ1ww0LBIfbWmozmm2iwnA5RAYr-7cT6j73IPVaEhREE47NmJ_MYeDEl4yXyanhYZIi98w9wABziylOKLeJaN0zzruruQrJ44yhSo_mPiKFWT7Jo_BFAa6iWpRlRYVkcCb55Hpw0QlMpBJoPiOeIjZ';

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'María Garcela Liansa',
    initials: 'MG',
    email: 'maria@email.com',
    phone: '(112) 626 7890',
    lastSession: '22 Mayo, 2025',
    status: 'Activo',
    therapyType: 'Terapia Individual',
  },
  {
    id: 'p2',
    name: 'Juan Pires Mendez',
    initials: 'JP',
    email: 'juan@email.com',
    phone: '(116) 666 7890',
    lastSession: '20 Mayo, 2025',
    status: 'Activo',
    therapyType: 'Terapia de Pareja',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEhVL0fpORek9HvG-JBPp64TrEnT0rJ5Sa8TGc6ooZTooVg-7UU7Ow-Osm08WZZzjA3I2SYtIkoGWDftXuCiCIiZUe7KE8kqr5HBk2-BTKCJ1pnOLnwxryiZeaepOZUSCb7Mp1y_ukoSgfvyrtm0Kz3PJiGw0rM9JXv7yoMNrs_7BaUL-vlxDUSBvasEl0Mu_NCJeKujNPZI_cjoewUdYt7vTmIzrfHFEjcSw2n27AC0oHSNIsxCsE',
  },
  {
    id: 'p3',
    name: 'Ana López Sinohes',
    initials: 'AL',
    email: 'son@email.com',
    phone: '(114) 667 2500',
    lastSession: '10 Mayo, 2025',
    status: 'Activo',
    therapyType: 'Terapia Individual',
  },
  {
    id: 'p4',
    name: 'Carlos Rois Martias',
    initials: 'CR',
    email: 'carlos@email.com',
    phone: '(115) 479 5912',
    lastSession: '10 Mayo, 2025',
    status: 'Inactivo',
    therapyType: 'Terapia Individual',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYTB1ipET2rNFzoZS6I0AK6nmtXkvhgcKTJ4CWL4s-N7lnEzVp63dwYIGJDSHOLCwQevrsDGGi8AMhSwD7X-jtFw1zhGuRHb5-80bYLtqBTFmrhOTR_JbH3OhkjG4oSWkWAqj96u4CBjFmaAYfL_88-Wy8vIrQDCKcZRtUJJ7079zVu6eRGRJHF5vNL-Lrta3ukt7gAYnLMVibXPfwfYQ9drllf6lXPOUEk0BDjQqq_Mu-HWKvg8WY',
  },
  {
    id: 'p5',
    name: 'Laura Tarras Vaga',
    initials: 'LT',
    email: 'laura@email.com',
    phone: '(114) 799 6123',
    lastSession: '8 Mayo, 2025',
    status: 'Activo',
    therapyType: 'Terapia Individual',
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientName: 'Maria García',
    therapyType: 'Individual',
    date: '2025-05-19',
    time: '13:00',
    durationMinutes: 60,
    dayIndex: 0, // Lun 19
    hourSlot: 13,
    topOffsetPx: 200,
    status: 'confirmada',
  },
  {
    id: 'a2',
    patientName: 'Taller Meditación',
    therapyType: 'Taller / Grupo',
    date: '2025-05-20',
    time: '09:00',
    durationMinutes: 60,
    dayIndex: 1, // Mar 20
    hourSlot: 9,
    topOffsetPx: 40,
    status: 'confirmada',
  },
  {
    id: 'a3',
    patientName: 'Juan y Ana',
    therapyType: 'Pareja',
    date: '2025-05-21',
    time: '11:00',
    durationMinutes: 60,
    dayIndex: 2, // Mié 21
    hourSlot: 11,
    topOffsetPx: 120,
    status: 'confirmada',
  },
  {
    id: 'a4',
    patientName: 'Carlos R.',
    therapyType: 'Individual',
    date: '2025-05-22',
    time: '10:00',
    durationMinutes: 60,
    dayIndex: 3, // Jue 22
    hourSlot: 10,
    topOffsetPx: 80,
    status: 'confirmada',
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay1',
    date: '22 Mayo, 2025',
    patientName: 'Mario García Limsa',
    concept: 'Terapia Individual',
    amount: 570,
    status: 'Pagado',
    method: 'Transferencia',
  },
  {
    id: 'pay2',
    date: '20 Mayo, 2025',
    patientName: 'Juan Plena Minuleza',
    concept: 'Terapia de Pareja',
    amount: 1200,
    status: 'Pagado',
    method: 'Tarjeta de crédito',
  },
  {
    id: 'pay3',
    date: '15 Mayo, 2025',
    patientName: 'Ana López Sinohaz',
    concept: 'Terapia Individual',
    amount: 350,
    status: 'Pendiente',
    method: 'Efectivo',
  },
  {
    id: 'pay4',
    date: '15 Mayo, 2025',
    patientName: 'Carlos Ruiz Martinez',
    concept: 'Taller de Relajación',
    amount: 500,
    status: 'Pagado',
    method: 'Transferencia',
  },
  {
    id: 'pay5',
    date: '8 Mayo, 2025',
    patientName: 'Laura Torras Vega',
    concept: 'Terapia Individual',
    amount: 820,
    status: 'Pendiente',
    method: 'Tarjeta de crédito',
  },
];

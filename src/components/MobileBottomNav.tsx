import React from 'react';
import { ScreenId, TransitionType } from '../types';

interface MobileBottomNavProps {
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentScreen, navigateTo }) => {
  return (
    <nav
      id="mobile-bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-[#fff8f3]/95 dark:bg-[#e4d8cc]/95 backdrop-blur-md border-t border-[#c9c7ba]/30 shadow-lg flex justify-around items-center pt-2 pb-3 px-2 md:hidden"
    >
      {/* Home / Inicio */}
      <a
        href="#inicio"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('landing', 'push_back');
        }}
        className="flex flex-col items-center text-[#48473d] p-2 hover:text-[#5e5d3f] transition-colors"
      >
        <span className="material-symbols-outlined text-[24px]">home</span>
        <span className="font-label-md text-[10px] mt-1">Inicio</span>
      </a>

      {/* Citas / Agenda */}
      <a
        href="#agenda"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('agenda', 'none');
        }}
        className={`flex flex-col items-center p-2 transition-all ${
          currentScreen === 'agenda'
            ? 'text-[#5e5d3f] font-bold scale-105'
            : 'text-[#48473d] hover:text-[#5e5d3f]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: currentScreen === 'agenda' ? "'FILL' 1" : "'FILL' 0" }}
        >
          event
        </span>
        <span className="font-label-md text-[10px] mt-1">Citas</span>
      </a>

      {/* Pacientes */}
      <a
        href="#pacientes"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('pacientes', 'none');
        }}
        className={`flex flex-col items-center p-2 transition-all ${
          currentScreen === 'pacientes'
            ? 'text-[#5e5d3f] font-bold scale-105'
            : 'text-[#48473d] hover:text-[#5e5d3f]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: currentScreen === 'pacientes' ? "'FILL' 1" : "'FILL' 0" }}
        >
          person
        </span>
        <span className="font-label-md text-[10px] mt-1">Pacientes</span>
      </a>

      {/* Pagos */}
      <a
        href="#pagos"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('pagos', 'none');
        }}
        className={`flex flex-col items-center p-2 transition-all ${
          currentScreen === 'pagos'
            ? 'text-[#5e5d3f] font-bold scale-105'
            : 'text-[#48473d] hover:text-[#5e5d3f]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[24px]"
          style={{ fontVariationSettings: currentScreen === 'pagos' ? "'FILL' 1" : "'FILL' 0" }}
        >
          account_balance_wallet
        </span>
        <span className="font-label-md text-[10px] mt-1">Pagos</span>
      </a>

      {/* Perfil / Settings / Logout */}
      <a
        href="#logout"
        onClick={(e) => {
          e.preventDefault();
          navigateTo('landing', 'push_back');
        }}
        className="flex flex-col items-center text-[#48473d] p-2 hover:text-[#ba1a1a] transition-colors"
      >
        <span className="material-symbols-outlined text-[24px]">account_circle</span>
        <span className="font-label-md text-[10px] mt-1">Perfil</span>
      </a>
    </nav>
  );
};

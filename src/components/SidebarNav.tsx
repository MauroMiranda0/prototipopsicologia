import React from 'react';
import { ScreenId, TransitionType } from '../types';
import { LOGO_IMG } from '../data/mockData';

interface SidebarNavProps {
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ currentScreen, navigateTo }) => {
  return (
    <aside
      id="sidebar-nav"
      className="hidden md:flex flex-col h-screen w-72 rounded-r-2xl bg-[#fef2e5] shadow-md p-4 space-y-2 sticky top-0 z-40 shrink-0 border-r border-[#c9c7ba]/30"
    >
      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center py-6 border-b border-[#c9c7ba]/30 mb-4">
        <button
          onClick={() => navigateTo('landing', 'push_back')}
          className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-[#777656]/30 shadow-sm transition-transform hover:scale-105"
        >
          <img
            src={LOGO_IMG}
            alt="Salud desde el Alma Logo"
            className="w-full h-full object-cover"
          />
        </button>
        <h2 className="font-headline-sm text-xl text-[#5e5d3f] font-semibold text-center leading-tight">
          Salud desde el Alma
        </h2>
        <p className="font-label-md text-xs text-[#48473d] mt-1 font-medium tracking-wider uppercase">
          Gestión Holística
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {/* Dashboard / Overview */}
        <a
          href="#dashboard"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('agenda', 'none');
          }}
          className={`flex items-center px-4 py-3 rounded-xl transition-all group ${
            currentScreen === 'agenda' ? 'text-[#79583d] font-bold' : 'text-[#48473d] hover:bg-[#ece1d5]'
          }`}
        >
          <span className="material-symbols-outlined mr-3 text-[#48473d] group-hover:text-[#5e5d3f] transition-colors">
            dashboard
          </span>
          <span className="font-body-md text-sm">Dashboard</span>
        </a>

        {/* Agenda */}
        <a
          href="#agenda"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('agenda', 'none');
          }}
          className={`flex items-center px-4 py-3 rounded-xl transition-all group ${
            currentScreen === 'agenda'
              ? 'bg-[#fed2af] text-[#79583d] font-bold translate-x-1 shadow-sm'
              : 'text-[#48473d] hover:bg-[#ece1d5]'
          }`}
        >
          <span
            className={`material-symbols-outlined mr-3 ${
              currentScreen === 'agenda' ? 'text-[#78583c]' : 'text-[#48473d] group-hover:text-[#5e5d3f]'
            }`}
            style={{ fontVariationSettings: currentScreen === 'agenda' ? "'FILL' 1" : "'FILL' 0" }}
          >
            calendar_month
          </span>
          <span className="font-body-md text-sm">Agenda</span>
        </a>

        {/* Pacientes */}
        <a
          href="#pacientes"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('pacientes', 'none');
          }}
          className={`flex items-center px-4 py-3 rounded-xl transition-all group ${
            currentScreen === 'pacientes'
              ? 'bg-[#fed2af] text-[#79583d] font-bold translate-x-1 shadow-sm'
              : 'text-[#48473d] hover:bg-[#ece1d5]'
          }`}
        >
          <span
            className={`material-symbols-outlined mr-3 ${
              currentScreen === 'pacientes' ? 'text-[#78583c]' : 'text-[#48473d] group-hover:text-[#5e5d3f]'
            }`}
            style={{ fontVariationSettings: currentScreen === 'pacientes' ? "'FILL' 1" : "'FILL' 0" }}
          >
            group
          </span>
          <span className="font-body-md text-sm">Pacientes</span>
        </a>

        {/* Pagos */}
        <a
          href="#pagos"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('pagos', 'none');
          }}
          className={`flex items-center px-4 py-3 rounded-xl transition-all group ${
            currentScreen === 'pagos'
              ? 'bg-[#fed2af] text-[#79583d] font-bold translate-x-1 shadow-sm'
              : 'text-[#48473d] hover:bg-[#ece1d5]'
          }`}
        >
          <span
            className={`material-symbols-outlined mr-3 ${
              currentScreen === 'pagos' ? 'text-[#78583c]' : 'text-[#48473d] group-hover:text-[#5e5d3f]'
            }`}
            style={{ fontVariationSettings: currentScreen === 'pagos' ? "'FILL' 1" : "'FILL' 0" }}
          >
            payments
          </span>
          <span className="font-body-md text-sm">Pagos</span>
        </a>

        {/* Terapias */}
        <a
          href="#terapias"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="flex items-center px-4 py-3 text-[#48473d] hover:bg-[#ece1d5] rounded-xl transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined mr-3 text-[#48473d] group-hover:text-[#5e5d3f] transition-colors">
            spa
          </span>
          <span className="font-body-md text-sm">Terapias</span>
        </a>

        {/* Mensajes */}
        <a
          href="#mensajes"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="flex items-center px-4 py-3 text-[#48473d] hover:bg-[#ece1d5] rounded-xl transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined mr-3 text-[#48473d] group-hover:text-[#5e5d3f] transition-colors">
            mail
          </span>
          <span className="font-body-md text-sm">Mensajes</span>
        </a>

        {/* Reportes */}
        <a
          href="#reportes"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="flex items-center px-4 py-3 text-[#48473d] hover:bg-[#ece1d5] rounded-xl transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined mr-3 text-[#48473d] group-hover:text-[#5e5d3f] transition-colors">
            analytics
          </span>
          <span className="font-body-md text-sm">Reportes</span>
        </a>
      </nav>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-[#c9c7ba]/30 space-y-1">
        <a
          href="#configuracion"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="flex items-center px-4 py-3 text-[#48473d] hover:bg-[#ece1d5] rounded-xl transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined mr-3 text-[#48473d] group-hover:text-[#5e5d3f] transition-colors">
            settings
          </span>
          <span className="font-body-md text-sm">Configuración</span>
        </a>

        <a
          id="sidebar-logout-btn"
          href="#logout"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('landing', 'push_back');
          }}
          className="flex items-center px-4 py-3 text-[#48473d] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-xl transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined mr-3 text-[#48473d] group-hover:text-[#ba1a1a] transition-colors">
            logout
          </span>
          <span className="font-body-md text-sm">Cerrar sesión</span>
        </a>
      </div>
    </aside>
  );
};

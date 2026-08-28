import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { LOGO_IMG, HERO_ILLUSTRATION, BANNER_MEDITATION } from '../data/mockData';

interface LandingPageProps {
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigateTo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    const phoneNumber = '56912345678';
    const message = encodeURIComponent('¡Hola! Me gustaría agendar una consulta en Salud desde el Alma.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#201b14] font-body-md selection:bg-[#5e5d3f]/20 selection:text-[#5e5d3f]">
      {/* TopAppBar */}
      <header className="bg-[#fff8f3]/90 backdrop-blur-md shadow-sm w-full top-0 sticky z-50 border-b border-[#c9c7ba]/20">
        <div className="flex justify-between items-center w-full px-4 md:px-16 py-4 max-w-7xl mx-auto bg-transparent">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              className="w-12 h-12 rounded-full object-cover shadow-sm border border-[#777656]/20"
              alt="Logo Salud desde el Alma"
              src={LOGO_IMG}
            />
            <span className="font-headline-md text-2xl md:text-3xl text-[#78583c] font-medium tracking-tight">
              Salud desde el Alma
            </span>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            <a
              className="font-label-md text-sm text-[#5e5d3f] font-bold border-b-2 border-[#5e5d3f] hover:opacity-80 transition-opacity"
              href="#inicio"
            >
              Inicio
            </a>
            <a
              className="font-label-md text-sm text-[#48473d] hover:text-[#5e5d3f] transition-colors"
              href="#nosotros"
            >
              Nosotros
            </a>
            <a
              className="font-label-md text-sm text-[#48473d] hover:text-[#5e5d3f] transition-colors"
              href="#servicios"
            >
              Servicios
            </a>
            <a
              className="font-label-md text-sm text-[#48473d] hover:text-[#5e5d3f] transition-colors"
              href="#terapias"
            >
              Terapias
            </a>
            <button
              id="nav-admin-login-btn"
              onClick={() => navigateTo('login', 'slide_up')}
              className="font-label-md text-sm text-[#78583c] hover:text-[#5e5d3f] transition-colors font-medium flex items-center gap-1.5 cursor-pointer bg-[#ece1d5]/40 hover:bg-[#ece1d5] px-3.5 py-1.5 rounded-full border border-[#c9c7ba]/60"
            >
              <span className="material-symbols-outlined text-base">lock</span>
              Login (Admin)
            </button>
          </nav>

          <div className="hidden md:block">
            <button
              id="landing-agenda-header-btn"
              onClick={handleOpenWhatsApp}
              className="bg-[#5e5d3f] hover:bg-[#777656] text-white px-6 py-2.5 rounded-full font-label-md text-sm shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Agenda tu consulta
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#48473d] p-2 hover:bg-[#ece1d5] rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#fff8f3] border-b border-[#c9c7ba]/40 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-label-md text-sm text-[#5e5d3f] font-semibold py-1"
            >
              Inicio
            </a>
            <a
              href="#nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-label-md text-sm text-[#48473d] py-1"
            >
              Nosotros
            </a>
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-label-md text-sm text-[#48473d] py-1"
            >
              Servicios
            </a>
            <a
              href="#terapias"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-label-md text-sm text-[#48473d] py-1"
            >
              Terapias
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('login', 'slide_up');
              }}
              className="w-full text-left font-label-md text-sm text-[#78583c] py-2 flex items-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-base">lock</span>
              Login (Uso exclusivo Admin)
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenWhatsApp();
                }}
                className="w-full bg-[#5e5d3f] hover:bg-[#777656] text-white py-2.5 rounded-full font-label-md text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Agenda tu consulta
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="bg-[#fef2e5] pt-16 pb-28 px-4 md:px-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col items-start text-left space-y-6">
              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#78583c] font-medium leading-[1.15] tracking-tight">
                Salud desde el Alma
              </h1>
              <p className="font-title-lg text-lg text-[#715735] tracking-[0.2em] uppercase font-semibold">
                CUERPO • MENTE • ESPÍRITU
              </p>
              <p className="font-body-lg text-lg text-[#48473d] max-w-md leading-relaxed">
                Acompañamiento psicológico integral para una vida plena y armoniosa.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  id="hero-agenda-btn"
                  onClick={handleOpenWhatsApp}
                  className="bg-[#5e5d3f] hover:bg-[#777656] text-white px-8 py-3.5 rounded-full font-label-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Agenda tu consulta
                </button>
              </div>
            </div>

            <div className="relative mt-8 md:mt-0 flex justify-center items-center">
              <div className="absolute inset-0 bg-[#fed2af]/30 rounded-full blur-3xl scale-125 -z-10"></div>
              <img
                alt="Lion and Lamb Illustration"
                className="w-full max-w-md lg:max-w-lg object-contain rounded-2xl drop-shadow-xl z-10 transition-transform duration-500 hover:scale-[1.02]"
                src={HERO_ILLUSTRATION}
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-24 px-4 md:px-16 bg-[#fff8f3]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 flex flex-col items-center">
              <div className="flex items-center gap-4 mb-3">
                <span className="material-symbols-outlined text-[#715735] text-2xl">spa</span>
                <h2 className="font-headline-lg text-3xl md:text-4xl text-[#78583c] font-medium">
                  Nuestros Servicios
                </h2>
                <span className="material-symbols-outlined text-[#715735] text-2xl">spa</span>
              </div>
              <p className="text-[#48473d] text-base max-w-lg">
                Espacios seguros diseñados para guiarte en tu proceso de autodescubrimiento y sanación.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-white rounded-2xl p-8 ambient-shadow flex flex-col items-center text-center border border-[#ece1d5]">
                <div className="w-16 h-16 bg-[#fef2e5] rounded-full flex items-center justify-center mb-6 text-[#715735] shadow-sm">
                  <span className="material-symbols-outlined text-4xl">self_improvement</span>
                </div>
                <h3 className="font-title-lg text-xl text-[#201b14] font-semibold mb-3">
                  Terapia Individual
                </h3>
                <p className="font-body-md text-sm text-[#48473d] leading-relaxed">
                  Un espacio confidencial para explorar tus emociones y encontrar tu bienestar emocional.
                </p>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white rounded-2xl p-8 ambient-shadow flex flex-col items-center text-center border border-[#ece1d5]">
                <div className="w-16 h-16 bg-[#fef2e5] rounded-full flex items-center justify-center mb-6 text-[#715735] shadow-sm">
                  <span className="material-symbols-outlined text-4xl">nature_people</span>
                </div>
                <h3 className="font-title-lg text-xl text-[#201b14] font-semibold mb-3">
                  Terapias de Relajación
                </h3>
                <p className="font-body-md text-sm text-[#48473d] leading-relaxed">
                  Técnicas especializadas para reducir el estrés y reconectar con tu paz interior.
                </p>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white rounded-2xl p-8 ambient-shadow flex flex-col items-center text-center border border-[#ece1d5]">
                <div className="w-16 h-16 bg-[#fef2e5] rounded-full flex items-center justify-center mb-6 text-[#715735] shadow-sm">
                  <span className="material-symbols-outlined text-4xl">groups</span>
                </div>
                <h3 className="font-title-lg text-xl text-[#201b14] font-semibold mb-3">
                  Talleres y Cursos
                </h3>
                <p className="font-body-md text-sm text-[#48473d] leading-relaxed">
                  Sesiones grupales para el crecimiento personal y el desarrollo de habilidades emocionales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meditation Banner Section */}
        <section id="nosotros" className="relative w-full min-h-[500px] flex items-center bg-[#ece1d5] overflow-hidden py-16">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-60 mix-blend-multiply"
            style={{ backgroundImage: `url('${BANNER_MEDITATION}')` }}
          ></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-16 w-full">
            <div className="max-w-xl bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-3xl ambient-shadow border border-white/60">
              <h2 className="font-headline-lg text-3xl md:text-4xl text-[#78583c] font-medium mb-5 leading-tight">
                Un espacio para tu bienestar integral
              </h2>
              <p className="font-body-lg text-base text-[#48473d] leading-relaxed">
                En Salud desde el Alma te acompañamos a alcanzar tu paz interior a través de un enfoque holístico, seguro y confidencial.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="terapias" className="bg-[#868564] text-white py-24 px-4 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 flex flex-col items-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="material-symbols-outlined text-[#e7e4be] text-2xl">eco</span>
                <h2 className="font-headline-lg text-3xl md:text-4xl font-medium text-white">
                  Por qué elegirnos
                </h2>
                <span className="material-symbols-outlined text-[#e7e4be] text-2xl">eco</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-[#e7e4be]/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-[#e7e4be] text-4xl">psychology</span>
                </div>
                <h3 className="font-title-lg text-xl font-semibold mb-3">Enfoque Integral</h3>
                <p className="font-body-md text-sm text-white/85 leading-relaxed max-w-xs">
                  Atendemos las necesidades de tu mente, cuerpo y espíritu de manera unificada.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-[#e7e4be]/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-[#e7e4be] text-4xl">favorite</span>
                </div>
                <h3 className="font-title-lg text-xl font-semibold mb-3">Acompañamiento Personal</h3>
                <p className="font-body-md text-sm text-white/85 leading-relaxed max-w-xs">
                  Un trato cálido, humano y completamente adaptado a tu proceso personal.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-[#e7e4be]/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-[#e7e4be] text-4xl">local_florist</span>
                </div>
                <h3 className="font-title-lg text-xl font-semibold mb-3">Crecimiento Consciente</h3>
                <p className="font-body-md text-sm text-white/85 leading-relaxed max-w-xs">
                  Herramientas prácticas para mantener tu bienestar a largo plazo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4 md:px-16 bg-[#fef2e5] text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-[#78583c] font-medium mb-8">
              Testimonios
            </h2>
            <span
              className="material-symbols-outlined text-[#e4c196] text-5xl mb-6 opacity-70"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <p className="font-body-lg text-lg md:text-xl text-[#201b14] italic mb-8 leading-relaxed max-w-2xl">
              "Gracias a Salud desde el Alma encontré paz y equilibrio en mi vida. El acompañamiento ha sido fundamental para mi crecimiento personal."
            </p>
            <p className="font-title-lg text-base font-semibold text-[#78583c] mb-8">— Laura M. —</p>
            <div className="flex gap-2.5 justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#78583c]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#c9c7ba]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#c9c7ba]"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-[#78583c] text-white py-16 px-6 md:px-16 border-t border-[#78583c]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_IMG}
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <h4 className="font-headline-md text-2xl font-medium">Salud desde el Alma</h4>
            </div>
            <p className="font-body-md text-sm text-white/80 leading-relaxed max-w-sm">
              Tu bienestar es nuestro propósito. Acompañamiento psicológico integral para el cuerpo, la mente y el espíritu.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-title-lg text-lg font-semibold mb-1">Información</h4>
            <p className="font-body-md text-sm text-white/80 flex items-center gap-3">
              <span className="material-symbols-outlined text-base">call</span> (123) 456 7990
            </p>
            <p className="font-body-md text-sm text-white/80 flex items-center gap-3">
              <span className="material-symbols-outlined text-base">mail</span> info@saluddesdeelalma.com
            </p>
            <p className="font-body-md text-sm text-white/80 flex items-center gap-3">
              <span className="material-symbols-outlined text-base">location_on</span> Ciudad de Bienestar
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-title-lg text-lg font-semibold mb-1">Acceso</h4>
            <nav className="flex flex-col gap-2">
              <a
                className="font-body-md text-sm text-white/80 hover:text-white transition-colors"
                href="#inicio"
              >
                Inicio
              </a>
              <a
                className="font-body-md text-sm text-white/80 hover:text-white transition-colors"
                href="#nosotros"
              >
                Nosotros
              </a>
              <a
                className="font-body-md text-sm text-white/80 hover:text-white transition-colors"
                href="#servicios"
              >
                Servicios
              </a>
              <a
                className="font-body-md text-sm text-white/80 hover:text-white transition-colors"
                href="#terapias"
              >
                Terapias
              </a>
              <button
                onClick={() => navigateTo('login', 'slide_up')}
                className="text-left font-body-md text-sm text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 mt-1"
              >
                <span className="material-symbols-outlined text-sm">lock</span>
                Login (Exclusivo Admin)
              </button>
            </nav>
          </div>

          <div className="col-span-1 md:col-span-3 border-t border-white/20 mt-4 pt-8 text-center">
            <p className="font-body-md text-xs text-white/60">
              © 2024 Salud desde el Alma. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};


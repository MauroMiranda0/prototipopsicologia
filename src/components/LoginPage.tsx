import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';
import { LOGO_IMG } from '../data/mockData';

interface LoginPageProps {
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigateTo }) => {
  const [username, setUsername] = useState('dra.elena@saluddesdeelalma.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('agenda', 'push');
  };

  return (
    <div className="bg-[#f3e7db] text-[#201b14] min-h-screen flex items-center justify-center font-body-md p-4 md:p-12 selection:bg-[#5e5d3f]/20 selection:text-[#5e5d3f] relative">
      {/* Return button */}
      <button
        onClick={() => navigateTo('landing', 'push_back')}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#48473d] hover:text-[#5e5d3f] bg-white/70 backdrop-blur px-4 py-2 rounded-full border border-[#c9c7ba]/40 shadow-sm transition-all hover:-translate-x-0.5 cursor-pointer text-sm font-label-md"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Volver al inicio
      </button>

      <div className="bg-white w-full max-w-md rounded-2xl p-8 md:p-12 shadow-[0_15px_40px_-15px_rgba(126,93,65,0.18)] border border-[#c9c7ba]/30 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 w-36 h-36 relative">
          <img
            alt="Salud desde el Alma Logo"
            className="w-full h-full object-cover rounded-full shadow-md border-2 border-[#777656]/20"
            src={LOGO_IMG}
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="font-headline-md text-2xl md:text-3xl text-[#78583c] font-medium">
            Salud desde el Alma
          </h2>
          <p className="font-label-md text-xs text-[#48473d] uppercase tracking-wider mt-1">
            Portal Profesional
          </p>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username or Email Field */}
            <div>
              <label
                className="block font-label-md text-sm text-[#48473d] mb-1.5 font-medium"
                htmlFor="username"
              >
                Username or Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#79776c] text-xl pointer-events-none">
                  person
                </span>
                <input
                  className="w-full bg-[#f3e7db]/40 border border-[#c9c7ba] rounded-xl py-3 pl-11 pr-4 text-[#201b14] focus:outline-none focus:ring-2 focus:ring-[#5e5d3f] focus:border-transparent transition-all text-sm placeholder:text-[#79776c]/60"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username or email"
                  type="text"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block font-label-md text-sm text-[#48473d] mb-1.5 font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#79776c] text-xl pointer-events-none">
                  lock
                </span>
                <input
                  className="w-full bg-[#f3e7db]/40 border border-[#c9c7ba] rounded-xl py-3 pl-11 pr-4 text-[#201b14] focus:outline-none focus:ring-2 focus:ring-[#5e5d3f] focus:border-transparent transition-all text-sm placeholder:text-[#79776c]/60"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-[#5e5d3f] bg-white border-[#79776c] rounded focus:ring-[#5e5d3f] accent-[#5e5d3f] cursor-pointer"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  className="ml-2 block text-xs text-[#48473d] cursor-pointer select-none"
                  htmlFor="remember-me"
                >
                  Remember Me
                </label>
              </div>
              <div className="text-xs">
                <a
                  className="font-medium text-[#78583c] hover:text-[#5e5d3f] transition-colors"
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="login-submit-btn"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-full shadow-md font-label-md text-sm font-semibold text-white bg-[#78583c] hover:bg-[#715735] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#78583c] transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                type="submit"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>

        {/* Subtle botanical accent */}
        <div className="mt-8 opacity-25 text-[#78583c] pointer-events-none flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
        </div>
      </div>
    </div>
  );
};

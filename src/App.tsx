/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, TransitionType } from './types';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { AgendaPanel } from './components/AgendaPanel';
import { PacientesPanel } from './components/PacientesPanel';
import { PagosPanel } from './components/PagosPanel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [transition, setTransition] = useState<TransitionType>('none');

  const navigateTo = (screen: ScreenId, trans: TransitionType = 'none') => {
    setTransition(trans);
    setCurrentScreen(screen);
  };

  // Determine transition variants based on transition type
  const getVariants = () => {
    switch (transition) {
      case 'slide_up':
        return {
          initial: { y: '100%', opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: '-30%', opacity: 0 },
        };
      case 'push':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-20%', opacity: 0 },
        };
      case 'push_back':
        return {
          initial: { x: '-100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '20%', opacity: 0 },
        };
      case 'none':
      default:
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  return (
    <div className="min-h-screen bg-[#fff8f3] text-[#201b14] overflow-x-hidden font-sans relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentScreen}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: transition === 'none' ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full min-h-screen"
        >
          {currentScreen === 'landing' && <LandingPage navigateTo={navigateTo} />}
          {currentScreen === 'login' && <LoginPage navigateTo={navigateTo} />}
          {currentScreen === 'agenda' && <AgendaPanel navigateTo={navigateTo} />}
          {currentScreen === 'pacientes' && <PacientesPanel navigateTo={navigateTo} />}
          {currentScreen === 'pagos' && <PagosPanel navigateTo={navigateTo} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

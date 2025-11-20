import React from 'react';
import { Button } from './Button';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative max-w-lg w-full glass-panel p-8 rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-violet-400" />
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center">
          BEM-VINDO AO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">PRIMEIRA VENDA</span>
        </h2>
        
        <p className="text-gray-300 text-lg text-center leading-relaxed mb-8">
          Aqui você vai aprender, do básico ao avançado, o método direto e comprovado para fazer sua primeira venda online — mesmo começando do zero.
        </p>

        <Button onClick={onClose} variant="secondary" glow fullWidth>
          INICIAR JORNADA
        </Button>
      </div>
    </div>
  );
};
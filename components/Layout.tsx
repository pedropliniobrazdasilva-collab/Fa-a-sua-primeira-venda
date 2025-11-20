import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { ProgressBar } from './ProgressBar';

interface LayoutProps {
  children: React.ReactNode;
  progressPercentage: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, progressPercentage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/modulos', label: 'Módulos' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#050505]">
      {/* Optimized Background - Static Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-900/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[80px]"></div>
      </div>

      {/* 
        HEADER REESTRUTURADO:
        Separamos o background (camada visual) do conteúdo (camada lógica).
        Z-Index 50 é suficiente se o contexto de empilhamento estiver limpo.
      */}
      <header className="fixed top-0 left-0 w-full z-50 h-16 md:h-20">
        {/* Camada Visual (O Vidro) - Fica atrás de tudo (-z-10 relative ao header) */}
        <div className="absolute inset-0 glass-panel border-b border-white/5 -z-10" />

        {/* Camada de Conteúdo - Onde os cliques acontecem */}
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex justify-between items-center h-full">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group relative z-20 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded bg-gradient-to-br from-cyan-600 to-violet-700 flex items-center justify-center group-hover:brightness-110 transition-all duration-300">
                <BookOpen className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base md:text-lg tracking-tighter text-white leading-none">
                  PRIMEIRA<span className="text-cyan-400">VENDA</span>
                </span>
                <span className="text-[8px] md:text-[9px] tracking-[0.2em] text-gray-500 uppercase">Academy</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 relative z-20">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors relative py-2 group cursor-pointer ${location.pathname === link.path ? 'text-cyan-400' : 'text-gray-400'}`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                </Link>
              ))}
              <div className="w-40 pl-4 border-l border-white/10">
                 <div className="flex justify-between text-[10px] text-gray-400 mb-1 uppercase tracking-wider">
                    <span>Progresso</span>
                    <span>{progressPercentage}%</span>
                 </div>
                 <ProgressBar percentage={progressPercentage} />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-3 hover:bg-white/10 rounded-lg transition-colors relative z-30 cursor-pointer active:bg-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 z-10 shadow-2xl shadow-black animate-in slide-in-from-top-5 duration-200">
             <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="block w-full px-4 py-4 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white hover:bg-white/5 rounded border border-transparent cursor-pointer active:bg-white/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
               <div className="px-4 py-4 bg-white/5 rounded mt-4 mx-2">
                 <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Seu Progresso Global</p>
                 <ProgressBar percentage={progressPercentage} />
               </div>
             </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-0 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black relative z-0">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <span className="font-bold text-lg text-white block mb-2 tracking-tighter">
                PRIMEIRA<span className="text-cyan-400">VENDA</span>
              </span>
              <p className="text-sm text-gray-600 max-w-xs">
                Plataforma de ensino focada em resultados reais.
              </p>
            </div>
            <div className="flex gap-8 text-xs font-medium uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-cyan-400 transition-colors">Termos</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Suporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
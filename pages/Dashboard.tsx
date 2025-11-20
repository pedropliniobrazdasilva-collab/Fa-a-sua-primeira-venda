import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProgress, Episode } from '../types';
import { COURSE_DATA, TOTAL_EPISODES } from '../constants';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { PlayCircle, Trophy, Clock, ArrowRight, Target, RefreshCw, CheckCircle } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, onResetProgress }) => {
  const navigate = useNavigate();
  
  // 1. Time based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  // 2. Smart Resume Logic
  // Flatten all episodes to make searching easier, adding module context
  const allEpisodes = COURSE_DATA.flatMap(m => m.episodes.map(e => ({ ...e, moduleTitle: m.title })));
  
  let activeEpisode: (Episode & { moduleTitle: string }) | null = null;

  // Priority 1: Continue from Last Visited
  if (progress.lastVisitedEpisode) {
    const lastIdx = allEpisodes.findIndex(e => e.id === progress.lastVisitedEpisode);
    if (lastIdx !== -1) {
      const lastEp = allEpisodes[lastIdx];
      
      // If the last visited episode is NOT completed, it's the one to watch.
      if (!progress.episodesCompleted.includes(lastEp.id)) {
        activeEpisode = lastEp;
      } 
      // If it IS completed, try to find the immediate next one.
      else if (lastIdx + 1 < allEpisodes.length) {
        activeEpisode = allEpisodes[lastIdx + 1];
      }
    }
  }

  // Priority 2: If logic above didn't find a candidate (e.g. user finished course or new user), find first uncompleted.
  if (!activeEpisode) {
    const firstUncompleted = allEpisodes.find(e => !progress.episodesCompleted.includes(e.id));
    if (firstUncompleted) {
      activeEpisode = firstUncompleted;
    }
  }

  // 3. Stats Logic
  const completedCount = progress.episodesCompleted.length;
  const percentage = Math.round((completedCount / TOTAL_EPISODES) * 100);
  const xp = completedCount * 150; 
  
  // Calculate completed modules
  const modulesCompletedCount = COURSE_DATA.filter(m => 
    m.episodes.every(ep => progress.episodesCompleted.includes(ep.id))
  ).length;

  const getQuote = () => {
    if (percentage === 0) return "O primeiro passo é o que separa os sonhadores dos realizadores.";
    if (percentage < 30) return "A consistência é a chave. Continue avançando.";
    if (percentage < 70) return "Você está construindo seu império. Não pare agora.";
    if (percentage < 100) return "A linha de chegada é apenas o começo da sua liberdade.";
    return "Você dominou o jogo. Agora vá e venda.";
  };

  const handleReset = () => {
    if (window.confirm("Tem certeza? Isso apagará todo o seu progresso no curso.")) {
      onResetProgress();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 uppercase">{greeting}, Vendedor</h1>
          <p className="text-cyan-400 font-mono uppercase tracking-widest text-sm">
             Painel de Controle • Status: Ativo
          </p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Conexão Segura</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ONLINE
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Left Column: Stats */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Next Lesson Card (Hero) */}
          <div className="glass-panel p-8 rounded-2xl border-l-4 border-cyan-500 relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-500">
            <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-16 -mt-16 transition-all group-hover:bg-cyan-500/20" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    {activeEpisode ? "Continuar de onde parou" : "Jornada Concluída"}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">
                    {activeEpisode ? activeEpisode.title : "Curso Finalizado!"}
                  </h2>
                  <p className="text-cyan-300 text-sm font-medium">
                    {activeEpisode ? activeEpisode.moduleTitle : "Você completou 100% do treinamento."}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                   {activeEpisode ? <PlayCircle className="text-white group-hover:text-cyan-400" /> : <Trophy className="text-yellow-400" />}
                </div>
              </div>

              {activeEpisode ? (
                <div className="flex items-center gap-4">
                  <Button onClick={() => navigate(`/episodio/${activeEpisode.id}`)} variant="primary" glow>
                    {progress.episodesCompleted.length === 0 ? "COMEÇAR AGORA" : "CONTINUAR AULA"}
                  </Button>
                  <div className="text-xs text-gray-500 font-mono">
                    Episódio {String(activeEpisode.globalIndex).padStart(2,'0')}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="secondary" glow className="cursor-default">
                    CERTIFICADO EM BREVE
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <div className="glass-panel p-6 rounded-xl border-t border-white/10 hover:border-cyan-500/30 transition-colors">
               <div className="flex items-center gap-3 mb-2 text-gray-400">
                 <Trophy size={18} className="text-yellow-500" />
                 <span className="text-xs font-bold uppercase tracking-widest">XP Total</span>
               </div>
               <div className="text-3xl font-bold text-white">{xp}</div>
             </div>
             
             <div className="glass-panel p-6 rounded-xl border-t border-white/10 hover:border-violet-500/30 transition-colors">
               <div className="flex items-center gap-3 mb-2 text-gray-400">
                 <CheckCircle size={18} className="text-violet-500" />
                 <span className="text-xs font-bold uppercase tracking-widest">Módulos</span>
               </div>
               <div className="text-3xl font-bold text-white">{modulesCompletedCount}/6</div>
             </div>

             <div className="glass-panel p-6 rounded-xl border-t border-white/10 hover:border-green-500/30 transition-colors col-span-2 md:col-span-1">
               <div className="flex items-center gap-3 mb-2 text-gray-400">
                 <Clock size={18} className="text-green-500" />
                 <span className="text-xs font-bold uppercase tracking-widest">Aulas</span>
               </div>
               <div className="text-3xl font-bold text-white">{completedCount}/{TOTAL_EPISODES}</div>
             </div>
          </div>
          
          {/* Quote Block */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-gray-900 to-black border border-white/5">
            <p className="text-gray-400 italic text-center font-medium">"{getQuote()}"</p>
          </div>

        </div>

        {/* Right Column: Progress Circle & Modules */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-2xl" />
            <h3 className="text-lg font-bold text-white mb-6 relative z-10">PROGRESSO GLOBAL</h3>
            <ProgressBar percentage={percentage} type="circle" />
            <div className="mt-6 text-xs text-gray-500 uppercase tracking-widest">
              {TOTAL_EPISODES - completedCount} episódios restantes
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
              <Target size={16} className="text-violet-400" /> Próximas Metas
            </h3>
            <ul className="space-y-4">
              <li className={`flex items-center gap-3 text-sm ${modulesCompletedCount >= 1 ? 'text-green-400 line-through opacity-50' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full ${modulesCompletedCount >= 1 ? 'bg-green-500' : 'bg-gray-700'}`} />
                Concluir Módulo 1
              </li>
              <li className={`flex items-center gap-3 text-sm ${percentage >= 50 ? 'text-green-400 line-through opacity-50' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full ${percentage >= 50 ? 'bg-green-500' : 'bg-gray-700'}`} />
                Chegar na metade do curso
              </li>
              <li className={`flex items-center gap-3 text-sm ${percentage === 100 ? 'text-green-400 line-through opacity-50' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full ${percentage === 100 ? 'bg-green-500' : 'bg-gray-700'}`} />
                Realizar a Primeira Venda
              </li>
            </ul>
          </div>

          {/* DEV ONLY: Reset Button */}
          <button 
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 p-4 rounded border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs uppercase tracking-widest transition-colors"
          >
             <RefreshCw size={14} /> Resetar Progresso
          </button>

        </div>

      </div>
      
      {/* Quick Nav to Modules */}
      <div className="flex justify-center">
         <Link to="/modulos" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest transition-colors group">
            Ver Grade Completa <ArrowRight className="group-hover:translate-x-1 transition-transform" />
         </Link>
      </div>
    </div>
  );
};
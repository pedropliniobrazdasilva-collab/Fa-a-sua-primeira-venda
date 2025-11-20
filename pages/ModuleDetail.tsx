import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { UserProgress } from '../types';
import { Lock, Play, Check, ArrowLeft, List, Clock } from 'lucide-react';
import { ProgressBar } from '../components/ProgressBar';

interface ModuleDetailProps {
  progress: UserProgress;
}

export const ModuleDetail: React.FC<ModuleDetailProps> = ({ progress }) => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const moduleData = COURSE_DATA.find(m => m.id === moduleId);

  if (!moduleData) {
    return <div className="text-center py-20 text-white">Módulo não encontrado.</div>;
  }

  // Calculate module stats
  const completedEpisodes = moduleData.episodes.filter(ep => progress.episodesCompleted.includes(ep.id));
  const percentage = Math.round((completedEpisodes.length / moduleData.episodes.length) * 100);

  // Helper to check if an episode is locked
  const isEpisodeLocked = (globalIndex: number) => {
    if (globalIndex === 1) return false; 
    // Simplified logic: find if previous global index is completed
    // Note: In a real app, using IDs directly is safer
    let prevEpId = '';
    // Find the ID of the episode with globalIndex - 1
    for(const m of COURSE_DATA) {
        const found = m.episodes.find(e => e.globalIndex === globalIndex - 1);
        if(found) prevEpId = found.id;
    }
    if (!prevEpId) return false;
    return !progress.episodesCompleted.includes(prevEpId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-in slide-in-from-right-4 duration-500">
      
      {/* Breadcrumb Nav */}
      <button 
        onClick={() => navigate('/modulos')} 
        className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 mb-8 transition-colors text-xs font-bold uppercase tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar aos Módulos
      </button>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Left Column: Sticky Module Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20 relative overflow-hidden">
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                  Módulo Atual
                </span>
                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
                  {moduleData.title.split('—')[1] || moduleData.title}
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {moduleData.description}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                    <span>Progresso do Módulo</span>
                    <span>{percentage}%</span>
                  </div>
                  <ProgressBar percentage={percentage} />
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-white">{moduleData.episodes.length}</span>
                      <span className="text-[10px] uppercase text-gray-500 tracking-wider">Aulas</span>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-white">{completedEpisodes.length}</span>
                      <span className="text-[10px] uppercase text-gray-500 tracking-wider">Concluídas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Episode List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-white font-bold flex items-center gap-2">
              <List size={20} className="text-cyan-400" /> LISTA DE AULAS
            </h2>
          </div>

          {moduleData.episodes.map((episode, idx) => {
            const isCompleted = progress.episodesCompleted.includes(episode.id);
            const isLocked = isEpisodeLocked(episode.globalIndex);
            const isNext = !isCompleted && !isLocked;

            return (
              <div 
                key={episode.id} 
                onClick={() => !isLocked && navigate(`/episodio/${episode.id}`)}
                className={`group relative flex items-center gap-4 p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                  isLocked 
                    ? 'bg-white/[0.02] border-white/5 opacity-60 cursor-not-allowed' 
                    : isNext
                      ? 'glass-panel border-cyan-500/50 bg-cyan-900/5 cursor-pointer hover:bg-cyan-900/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/5 cursor-pointer'
                }`}
              >
                {/* Status Icon */}
                <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-colors ${
                  isCompleted 
                    ? 'bg-green-500/10 border-green-500 text-green-500' 
                    : isLocked 
                      ? 'bg-white/5 border-white/10 text-gray-600'
                      : 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                }`}>
                  {isCompleted ? <Check size={18} /> : isLocked ? <Lock size={18} /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isNext ? 'text-cyan-400' : 'text-gray-500'}`}>
                      Aula {String(idx + 1).padStart(2, '0')}
                    </span>
                    {isNext && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                  </div>
                  <h3 className={`text-base md:text-lg font-bold truncate transition-colors ${
                    isCompleted ? 'text-gray-400' : isLocked ? 'text-gray-600' : 'text-white group-hover:text-cyan-200'
                  }`}>
                    {episode.title}
                  </h3>
                </div>

                {/* Right Action (Desktop) */}
                <div className="hidden md:flex flex-col items-end gap-1 text-right pl-4 border-l border-white/5 min-w-[100px]">
                   {isLocked ? (
                     <span className="text-xs text-gray-600 uppercase font-bold tracking-wider flex items-center gap-1">
                       <Lock size={10} /> Bloqueado
                     </span>
                   ) : (
                     <>
                      <span className={`text-xs font-bold uppercase tracking-widest ${isCompleted ? 'text-green-500' : 'text-cyan-400'}`}>
                        {isCompleted ? 'Rever' : 'Assistir'}
                      </span>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Clock size={10} /> 15 min
                      </span>
                     </>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
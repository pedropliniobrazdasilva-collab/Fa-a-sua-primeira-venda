import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { UserProgress } from '../types';
import { CheckCircle2, Lock, BarChart, ArrowLeft, Play } from 'lucide-react';

interface ModulesProps {
  progress: UserProgress;
}

export const Modules: React.FC<ModulesProps> = ({ progress }) => {
  const navigate = useNavigate();
  
  const getModuleStatus = (moduleId: string, episodes: string[]) => {
    const completedCount = episodes.filter(epId => progress.episodesCompleted.includes(epId)).length;
    const total = episodes.length;
    const percentage = Math.round((completedCount / total) * 100);
    return { percentage, completedCount, total };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      
      {/* Header & Nav */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 text-gray-500 hover:text-white mb-4 transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Dashboard
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
            Seleção de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Módulos</span>
          </h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Treinamento Completo</p>
          <p className="text-white font-bold text-xl">6 Fases</p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSE_DATA.map((module, index) => {
          const episodeIds = module.episodes.map(ep => ep.id);
          const { percentage, completedCount, total } = getModuleStatus(module.id, episodeIds);
          
          // Logic: Locked if previous module is not 100% complete (Demo logic: kept open for UX, styling shows lock)
          const previousModuleIds = index > 0 ? COURSE_DATA[index - 1].episodes.map(e => e.id) : [];
          const previousModuleStatus = index > 0 ? getModuleStatus(COURSE_DATA[index - 1].id, previousModuleIds) : { percentage: 100 };
          
          // For strict locking, uncomment:
          // const isLocked = index > 0 && previousModuleStatus.percentage < 100;
          const isLocked = false; // Open for demo
          const isComplete = percentage === 100;

          return (
            <Link 
              key={module.id} 
              to={isLocked ? '#' : `/modulo/${module.id}`}
              className={`group relative h-full flex flex-col justify-between p-8 rounded-2xl border transition-all duration-500 overflow-hidden ${
                isLocked 
                  ? 'bg-white/[0.02] border-white/5 cursor-not-allowed grayscale opacity-60' 
                  : isComplete
                    ? 'bg-green-900/10 border-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                    : 'glass-panel border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-gradient-to-b from-white/[0.05] to-transparent'
              }`}
            >
              {/* Background Watermark Number */}
              <div className="absolute -right-4 -bottom-8 text-[140px] font-bold leading-none font-orbitron opacity-[0.03] group-hover:opacity-[0.08] transition-opacity select-none pointer-events-none">
                {index + 1}
              </div>
              
              {/* Shine Effect on Hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine pointer-events-none" />

              <div>
                {/* Top Metadata */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded border ${
                    isComplete 
                      ? 'text-green-400 border-green-500/30 bg-green-500/10' 
                      : 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
                  }`}>
                    Fase {String(index + 1).padStart(2, '0')}
                  </span>
                  {isLocked ? (
                    <Lock size={18} className="text-gray-600" />
                  ) : isComplete ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <BarChart size={18} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  )}
                </div>

                {/* Title & Desc */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors relative z-10">
                  {module.title.split('—')[1] || module.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 relative z-10">
                  {module.description}
                </p>
              </div>

              {/* Bottom Stats */}
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {completedCount}/{total} Aulas
                  </span>
                  <span className={`text-xl font-bold ${isComplete ? 'text-green-400' : 'text-white'}`}>
                    {percentage}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-cyan-500 to-violet-500'
                    }`} 
                    style={{ width: `${percentage}%` }} 
                  />
                </div>

                {!isLocked && (
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Acessar Módulo <Play size={10} fill="currentColor" />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
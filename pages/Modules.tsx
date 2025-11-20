import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { UserProgress } from '../types';
import { CheckCircle2, ChevronRight, Lock, Clock, BarChart, ArrowLeft } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate('/dashboard')} 
        className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors text-sm uppercase tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar ao Dashboard
      </button>

      {/* Hero Section for Modules */}
      <div className="text-center mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 relative z-10">
          MAPA DA JORNADA
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg relative z-10">
          Siga o caminho dourado. Cada módulo é uma peça do quebra-cabeça da sua liberdade financeira.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Timeline) */}
        <div className="absolute left-4 md:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-transparent hidden md:block" />

        <div className="space-y-12 md:space-y-16">
          {COURSE_DATA.map((module, index) => {
            const episodeIds = module.episodes.map(ep => ep.id);
            const { percentage, completedCount, total } = getModuleStatus(module.id, episodeIds);
            const isComplete = percentage === 100;
            const isLocked = index > 0 && getModuleStatus(COURSE_DATA[index-1].id, COURSE_DATA[index-1].episodes.map(e=>e.id)).percentage < 100; // Basic visual lock logic
            
            // Visual lock logic for Demo purposes: Open everything, but show styled "Locked" visually if previous not done
            // Real logic: keep accessible so user can look around
            
            return (
              <div key={module.id} className="relative md:pl-24">
                
                {/* Timeline Node */}
                <div className={`absolute left-4 md:left-8 top-8 w-4 h-4 -translate-x-1/2 rounded-full border-2 hidden md:block z-10 bg-[#050505] transition-colors duration-500 ${
                  isComplete ? 'border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 
                  percentage > 0 ? 'border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-gray-700'
                }`} />

                <Link 
                  to={`/modulo/${module.id}`} 
                  className={`group block relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isComplete ? 'bg-green-900/5 border-green-500/30' : 
                    percentage > 0 ? 'glass-panel border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 
                    'bg-white/5 border-white/5 hover:bg-white/[0.07]'
                  }`}
                >
                  {/* Progress Bar Top */}
                  <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-700" style={{ width: `${percentage}%` }} />

                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                    
                    {/* Left Info */}
                    <div className="flex-1 relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                          isComplete ? 'text-green-400 border-green-500/20 bg-green-500/10' : 
                          percentage > 0 ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10' : 
                          'text-gray-500 border-gray-700 bg-gray-800/50'
                        }`}>
                          Módulo 0{index + 1}
                        </span>
                        
                        {/* Fake Metadata */}
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-500">
                           <Clock size={12} /> 45 min
                        </span>
                         <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-500">
                           <BarChart size={12} /> {index > 3 ? 'Avançado' : 'Iniciante'}
                        </span>
                      </div>

                      <h3 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors ${
                        isComplete ? 'text-green-100' : 'text-white group-hover:text-cyan-100'
                      }`}>
                        {module.title.split('—')[1]}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base max-w-xl">
                        {module.description}
                      </p>
                    </div>

                    {/* Right Action / Status */}
                    <div className="flex items-center justify-between md:justify-end gap-6 min-w-[150px]">
                      <div className="text-right hidden md:block">
                        <div className={`text-2xl font-bold font-orbitron ${isComplete ? 'text-green-400' : 'text-white'}`}>
                          {percentage}%
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Concluído</div>
                      </div>

                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isComplete ? 'bg-green-500 text-black' : 
                        'bg-white/10 text-white group-hover:bg-cyan-500 group-hover:text-black'
                      }`}>
                        {isComplete ? <CheckCircle2 /> : <ChevronRight />}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Background Number */}
                  <div className="absolute right-0 bottom-0 text-[120px] font-bold text-white/5 leading-none -mb-8 -mr-4 pointer-events-none select-none font-orbitron">
                    {index + 1}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { UserProgress } from '../types';
import { Lock, PlayCircle, CheckCircle, ArrowLeft } from 'lucide-react';

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

  // Helper to check if an episode is locked
  const isEpisodeLocked = (globalIndex: number) => {
    if (globalIndex === 1) return false; // First episode always open
    
    // Find ID of previous episode (simplified logic: we assume globalIndex corresponds to order)
    // In a real app, we'd look up the ID. Here we constructed IDs based on order in constants.
    // However, our progress tracks IDs.
    
    // Let's iterate to find previous episode ID
    let prevEpId = '';
    for(const m of COURSE_DATA) {
        for(const ep of m.episodes) {
            if(ep.globalIndex === globalIndex - 1) {
                prevEpId = ep.id;
            }
        }
    }
    
    if (!prevEpId) return false; // Should not happen if logic holds
    return !progress.episodesCompleted.includes(prevEpId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-right-8 duration-500">
      <button 
        onClick={() => navigate('/modulos')} 
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm uppercase tracking-widest"
      >
        <ArrowLeft size={16} /> Voltar aos Módulos
      </button>

      <div className="mb-12 border-l-4 border-cyan-500 pl-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{moduleData.title}</h1>
        <p className="text-xl text-gray-400">{moduleData.description}</p>
      </div>

      <div className="space-y-4">
        {moduleData.episodes.map((episode) => {
          const isCompleted = progress.episodesCompleted.includes(episode.id);
          const isLocked = isEpisodeLocked(episode.globalIndex);
          
          return (
            <div 
              key={episode.id} 
              className={`relative rounded-lg border transition-all duration-300 overflow-hidden group ${
                isLocked 
                  ? 'bg-white/[0.02] border-white/5 cursor-not-allowed opacity-60' 
                  : 'glass-panel border-white/10 hover:border-cyan-500/30 cursor-pointer hover:bg-white/[0.07]'
              }`}
              onClick={() => {
                if (!isLocked) navigate(`/episodio/${episode.id}`);
              }}
            >
              <div className="p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                    isCompleted 
                      ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                      : isLocked 
                        ? 'bg-white/5 border-white/10 text-gray-600'
                        : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                  }`}>
                    {isCompleted ? <CheckCircle size={20} /> : isLocked ? <Lock size={20} /> : <PlayCircle size={20} />}
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Episódio {String(episode.globalIndex).padStart(2, '0')}</div>
                    <h3 className={`font-bold text-lg ${isLocked ? 'text-gray-500' : 'text-white group-hover:text-cyan-100'}`}>
                      {episode.title}
                    </h3>
                  </div>
                </div>
                
                {!isLocked && (
                   <div className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 text-sm font-bold uppercase tracking-wider">
                     Acessar
                   </div>
                )}
              </div>
              
              {/* Progress line if completed */}
              {isCompleted && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 box-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
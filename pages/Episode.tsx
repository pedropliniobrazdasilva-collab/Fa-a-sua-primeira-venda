import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { UserProgress } from '../types';
import { Button } from '../components/Button';
import { CheckSquare, ArrowRight, Check, Target, List, Zap, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';

interface EpisodeProps {
  progress: UserProgress;
  onComplete: (id: string) => void;
  onVisit: (id: string) => void;
}

export const Episode: React.FC<EpisodeProps> = ({ progress, onComplete, onVisit }) => {
  const { episodeId } = useParams();
  const navigate = useNavigate();
  
  // Checklist State Logic
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // Load checklist state from local storage specifically for this episode
  useEffect(() => {
    if (!episodeId) return;
    const storedChecklist = localStorage.getItem(`checklist-${episodeId}`);
    if (storedChecklist) {
      try {
        setCheckedItems(JSON.parse(storedChecklist));
      } catch (e) {
        console.error("Failed to parse checklist", e);
      }
    } else {
      setCheckedItems({});
    }
  }, [episodeId]);

  // Find Episode and Parent Module
  let episode = null;
  let nextEpisodeId = null;
  let parentModuleId = null;

  for (let mIndex = 0; mIndex < COURSE_DATA.length; mIndex++) {
    const mod = COURSE_DATA[mIndex];
    const epIndex = mod.episodes.findIndex(e => e.id === episodeId);
    if (epIndex !== -1) {
      episode = mod.episodes[epIndex];
      parentModuleId = mod.id;
      if (epIndex < mod.episodes.length - 1) {
        nextEpisodeId = mod.episodes[epIndex + 1].id;
      } else if (mIndex < COURSE_DATA.length - 1) {
        nextEpisodeId = COURSE_DATA[mIndex + 1].episodes[0].id;
      }
      break;
    }
  }

  useEffect(() => {
    if (episodeId) {
      onVisit(episodeId);
    }
  }, [episodeId, onVisit]);

  if (!episode) {
    return <div className="text-center pt-20 text-white">Episódio não encontrado.</div>;
  }

  const isCompleted = progress.episodesCompleted.includes(episode.id);

  const toggleChecklistItem = (index: number) => {
    const newChecked = { ...checkedItems, [index]: !checkedItems[index] };
    setCheckedItems(newChecked);
    localStorage.setItem(`checklist-${episodeId}`, JSON.stringify(newChecked));
  };

  const handleComplete = () => {
    if (episode) {
      onComplete(episode.id);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const content = episode.content;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button */}
      <button 
        onClick={() => parentModuleId ? navigate(`/modulo/${parentModuleId}`) : navigate('/modulos')} 
        className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 mb-8 transition-colors text-xs font-bold uppercase tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar ao Módulo
      </button>

      {/* Episode Header */}
      <div className="mb-10 pb-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400 text-xs font-bold uppercase tracking-widest">
             Aula {String(episode.globalIndex).padStart(2, '0')}
          </span>
          {isCompleted && (
            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              <Check size={12} /> Concluída
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight font-orbitron">
          {episode.title}
        </h1>
      </div>

      {/* Content Blocks */}
      <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
        
        {/* Intro */}
        <div className="glass-panel p-8 rounded-2xl border-l-4 border-violet-500 bg-gradient-to-r from-violet-900/10 to-transparent">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
            <Zap className="text-violet-400 w-5 h-5" /> Introdução
          </h3>
          <p className="text-white/90 font-medium">{content.intro}</p>
        </div>

        {/* Deep Dive Explanation */}
        <div className="prose prose-invert max-w-none">
          <h3 className="text-2xl text-white font-bold mb-4 flex items-center gap-2">
            <FileText className="text-cyan-400" /> O Conceito
          </h3>
          <p className="text-gray-300 leading-8">{content.explanation}</p>
        </div>

        {/* Actionable Steps */}
        <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5">
           <h3 className="text-2xl text-white font-bold mb-8 flex items-center gap-3">
             <List className="text-cyan-400" /> Plano de Ação
           </h3>
           <div className="space-y-6">
             {content.steps.map((step, i) => (
               <div key={i} className="flex gap-5">
                 <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-violet-700 text-white flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
                   {i + 1}
                 </div>
                 <div className="pt-1">
                    <p className="text-white font-medium">{step}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Real World Examples */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2 mb-2">
             <h3 className="text-xl text-white font-bold flex items-center gap-2">
               <AlertTriangle className="text-yellow-400" /> Exemplos Reais
             </h3>
          </div>
          {content.examples.map((ex, i) => (
            <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <p className="italic text-gray-400">"{ex}"</p>
            </div>
          ))}
        </div>

        {/* Interactive Checklist */}
        <div className="glass-panel p-8 rounded-2xl border border-green-500/20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
           <h3 className="text-xl text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest">
             <CheckSquare className="text-green-400" /> Checklist de Execução
           </h3>
           <div className="space-y-3">
             {content.checklist.map((item, i) => {
               const isChecked = !!checkedItems[i];
               return (
                 <div 
                    key={i} 
                    onClick={() => toggleChecklistItem(i)}
                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                      isChecked 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-black/40 border-white/5 hover:bg-white/5'
                    }`}
                 >
                   <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                     isChecked ? 'bg-green-500 border-green-500' : 'border-gray-500'
                   }`}>
                      {isChecked && <Check size={14} className="text-black font-bold" />}
                   </div>
                   <span className={`transition-colors font-medium ${isChecked ? 'text-green-100 line-through opacity-70' : 'text-gray-300'}`}>
                     {item}
                   </span>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Task Mission */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-violet-900/30 p-10 rounded-2xl border border-cyan-500/20 text-center relative">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#050505] px-4 text-cyan-400">
             <Target className="w-10 h-10" />
          </div>
          <h3 className="text-2xl text-white font-bold mb-4 mt-2 font-orbitron">SUA MISSÃO AGORA</h3>
          <p className="text-cyan-50 text-lg">{content.task}</p>
        </div>

      </div>

      {/* Action Footer */}
      <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center gap-6">
        {!isCompleted ? (
          <Button onClick={handleComplete} variant="secondary" glow className="w-full md:w-1/2 text-lg py-5">
            MARCAR COMO CONCLUÍDO
          </Button>
        ) : (
          <div className="w-full flex flex-col items-center animate-in zoom-in duration-300">
            <div className="text-green-400 font-bold mb-6 flex items-col gap-2 text-center uppercase tracking-widest">
               Aula Finalizada
            </div>
            {nextEpisodeId ? (
              <Button 
                onClick={() => navigate(`/episodio/${nextEpisodeId}`)} 
                variant="primary" 
                className="w-full md:w-1/2 py-4"
              >
                IR PARA PRÓXIMA AULA <ArrowRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button 
                 onClick={() => navigate('/dashboard')}
                 variant="outline"
              >
                VOLTAR AO DASHBOARD
              </Button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { UserProgress } from '../types';
import { Button } from '../components/Button';
import { CheckSquare, ArrowRight, Check, Target, List, PlayCircle, FileText, AlertTriangle, ArrowLeft, BookOpen } from 'lucide-react';

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
      // No scroll here, handled by scroll restoration
    }
  };

  const content = episode.content;
  const backLink = parentModuleId ? `/modulo/${parentModuleId}` : '/modulos';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button - Changed to Link for stability */}
      <Link 
        to={backLink}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 mb-8 transition-colors text-xs font-bold uppercase tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Voltar ao Módulo
      </Link>

      {/* Episode Header */}
      <div className="mb-8">
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

      {/* VIDEO PLACEHOLDER SECTION */}
      <div className="mb-12">
         <div className="aspect-video w-full bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_0_40px_rgba(6,182,212,0.1)]">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(6,182,212,0.1)_0%,transparent_40%,transparent_60%,rgba(139,92,246,0.1)_100%)] opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center animate-pulse">
               <PlayCircle className="w-20 h-20 text-white/20 group-hover:text-cyan-400 transition-all duration-500 scale-95 group-hover:scale-110" />
               <span className="mt-6 text-cyan-500/50 text-sm font-bold uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors">
                 Vídeo em Breve
               </span>
            </div>
         </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
        
        {/* RESUMO DA AULA (Substituindo a antiga Intro/Explanation) */}
        <div className="relative">
           <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent hidden md:block" />
           <h3 className="text-2xl text-white font-bold mb-6 flex items-center gap-3 font-orbitron">
              <BookOpen className="text-cyan-400 w-6 h-6" /> RESUMO DA AULA
           </h3>
           <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
              <p className="text-gray-200 text-lg leading-8 whitespace-pre-line">
                {content.summary}
              </p>
           </div>
        </div>

        {/* Actionable Steps */}
        <div className="bg-neutral-900/50 rounded-2xl p-8 border border-white/5">
           <h3 className="text-xl text-white font-bold mb-8 flex items-center gap-3 uppercase tracking-wider text-sm">
             <List className="text-violet-400" /> Pontos Chave & Ação
           </h3>
           <div className="space-y-6">
             {content.steps.map((step, i) => (
               <div key={i} className="flex gap-5 group">
                 <div className="flex-shrink-0 w-8 h-8 rounded bg-white/5 text-gray-400 border border-white/10 flex items-center justify-center font-bold text-sm group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                   {i + 1}
                 </div>
                 <div className="pt-0.5">
                    <p className="text-gray-300 group-hover:text-white transition-colors">{step}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Real World Examples */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2 mb-2">
             <h3 className="text-lg text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
               <AlertTriangle className="text-yellow-400" /> Exemplos Práticos
             </h3>
          </div>
          {content.examples.map((ex, i) => (
            <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
              <p className="italic text-gray-400 text-base">"{ex}"</p>
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
        <div className="bg-gradient-to-br from-cyan-900/20 to-violet-900/20 p-10 rounded-2xl border border-cyan-500/20 text-center relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyan-500/10 text-cyan-400 mb-4 border border-cyan-500/20">
               <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl text-white font-bold mb-4 font-orbitron">SUA MISSÃO AGORA</h3>
            <p className="text-cyan-50 text-lg max-w-2xl mx-auto">{content.task}</p>
          </div>
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
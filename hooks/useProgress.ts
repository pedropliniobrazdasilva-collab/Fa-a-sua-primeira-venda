import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

const STORAGE_KEY = 'primeira_venda_progress';

const DEFAULT_PROGRESS: UserProgress = {
  episodesCompleted: [],
  lastVisitedEpisode: null,
  showWelcome: true,
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar progresso", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const completeEpisode = (episodeId: string) => {
    if (!progress.episodesCompleted.includes(episodeId)) {
      const newCompleted = [...progress.episodesCompleted, episodeId];
      saveProgress({
        ...progress,
        episodesCompleted: newCompleted,
      });
    }
  };

  const dismissWelcome = () => {
    saveProgress({ ...progress, showWelcome: false });
  };

  const setLastVisited = (episodeId: string) => {
    saveProgress({ ...progress, lastVisitedEpisode: episodeId });
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(DEFAULT_PROGRESS);
    window.location.reload();
  };

  return {
    progress,
    isLoaded,
    completeEpisode,
    dismissWelcome,
    setLastVisited,
    resetProgress
  };
};
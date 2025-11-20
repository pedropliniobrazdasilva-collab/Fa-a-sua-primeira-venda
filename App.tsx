import React, { useLayoutEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { WelcomePopup } from './components/WelcomePopup';
import { Home } from './pages/Home';
import { Modules } from './pages/Modules';
import { ModuleDetail } from './pages/ModuleDetail';
import { Episode } from './pages/Episode';
import { Dashboard } from './pages/Dashboard';
import { useProgress } from './hooks/useProgress';
import { TOTAL_EPISODES } from './constants';

// Scroll to top helper - using useLayoutEffect for immediate scroll reset
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const { progress, isLoaded, completeEpisode, dismissWelcome, setLastVisited, resetProgress } = useProgress();

  if (!isLoaded) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-500 font-orbitron animate-pulse">CARREGANDO SISTEMA...</div>;
  }

  const progressPercentage = Math.round((progress.episodesCompleted.length / TOTAL_EPISODES) * 100);

  return (
    <Router>
      <ScrollToTop />
      <Layout progressPercentage={progressPercentage}>
        <WelcomePopup isOpen={progress.showWelcome} onClose={dismissWelcome} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<Dashboard progress={progress} onResetProgress={resetProgress} />} />
          <Route path="/modulos" element={<Modules progress={progress} />} />
          <Route path="/modulo/:moduleId" element={<ModuleDetail progress={progress} />} />
          <Route 
            path="/episodio/:episodeId" 
            element={
              <Episode 
                progress={progress} 
                onComplete={completeEpisode} 
                onVisit={setLastVisited} 
              />
            } 
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
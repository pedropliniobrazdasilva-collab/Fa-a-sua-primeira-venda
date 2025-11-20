export interface EpisodeContent {
  summary: string;
  intro?: string; // Optional now, as summary takes precedence
  explanation?: string; // Optional
  steps: string[];
  examples: string[];
  checklist: string[];
  task: string;
}

export interface Episode {
  id: string; // e.g., "1-1" for Mod 1 Ep 1
  globalIndex: number; // 1 to 30
  title: string;
  moduleId: string;
  content: EpisodeContent;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  episodes: Episode[];
}

export interface UserProgress {
  episodesCompleted: string[]; // Array of episode IDs
  lastVisitedEpisode: string | null;
  showWelcome: boolean;
}
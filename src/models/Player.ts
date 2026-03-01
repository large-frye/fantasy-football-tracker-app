import type { SportType } from './Sport';
import type { Statistics } from './Statistics';

// Player model
export interface Player {
  id: string;
  name: string;
  sportType: SportType;
  position: string;
  teamAffiliation: string; // Real-world team (e.g., "Dallas Cowboys")
  statistics: Statistics;
  createdAt: Date;
  updatedAt: Date;
}

// Search and filter types
export interface PlayerFilters {
  sportType?: SportType;
  position?: string;
  teamAffiliation?: string;
  minStat?: { key: string; value: number };
  maxStat?: { key: string; value: number };
}

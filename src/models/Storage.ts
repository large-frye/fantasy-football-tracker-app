import type { Team } from './Team';
import type { Player } from './Player';
import type { SportType } from './Sport';
import type { MigrationStatus } from './Migration';

// Storage keys
export const STORAGE_KEYS = {
  TEAMS: 'fantasy-tracker:teams',
  PLAYERS: 'fantasy-tracker:players',
  USER_PREFS: 'fantasy-tracker:preferences',
  MIGRATION_STATUS: 'fantasy-tracker:migration-status'
} as const;

// Storage format
export interface StorageData {
  teams: Record<string, Team>;
  players: Record<string, Player>;
  preferences: UserPreferences;
  migrationStatus: MigrationStatus;
}

export interface UserPreferences {
  defaultSport: SportType;
  theme: 'light' | 'dark';
  sortPreference: string;
}

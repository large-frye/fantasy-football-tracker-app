import type { SportType } from './Sport';

// Statistics model (sport-agnostic container)
export interface Statistics {
  sportType: SportType;
  season: string;
  stats: Record<string, number | string>;
}

// Sport-specific stat definitions
export interface FootballStats {
  passingYards: number;
  rushingYards: number;
  touchdowns: number;
  receptions: number;
  interceptions?: number;
}

export interface BasketballStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
}

export interface BaseballStats {
  battingAverage: number;
  homeRuns: number;
  rbis: number;
  era?: number;
  strikeouts: number;
}

export interface HockeyStats {
  goals: number;
  assists: number;
  plusMinus: number;
  penaltyMinutes: number;
  saves?: number;
}

// Formatted stats for display
export interface FormattedStats {
  [key: string]: string;
}

// Comparison result
export interface ComparisonResult {
  playerIds: string[];
  statKey: string;
  values: Array<{ playerId: string; value: number | string }>;
}

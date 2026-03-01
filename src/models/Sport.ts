// Sport types supported by the application
export type SportType = 'football' | 'basketball' | 'baseball' | 'hockey';

// Sport configuration interface
export interface SportConfig {
  type: SportType;
  displayName: string;
  positions: string[];
  statDefinitions: StatDefinition[];
  primaryStats: string[];
  sortableStats: string[];
}

// Stat definition for a sport
export interface StatDefinition {
  key: string;
  displayName: string;
  format: 'number' | 'decimal' | 'percentage';
  description: string;
}

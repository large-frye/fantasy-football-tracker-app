// Migration types
export interface MigrationResult {
  success: boolean;
  teamsCreated: number;
  playersCreated: number;
  errors: MigrationError[];
}

export interface MigrationError {
  type: 'team' | 'player' | 'stats';
  message: string;
  data: unknown;
}

export interface MigrationStatus {
  completed: boolean;
  timestamp: Date;
  version: string;
}

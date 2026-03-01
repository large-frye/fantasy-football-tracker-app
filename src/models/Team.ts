import type { SportType } from './Sport';

// Team model
export interface Team {
  id: string;
  name: string;
  sportType: SportType;
  playerIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

import { describe, it, expect } from 'vitest';
import type { 
  Team, 
  Player, 
  Statistics, 
  SportType,
  FootballStats,
  BasketballStats,
  BaseballStats,
  HockeyStats,
  ValidationResult,
  MigrationResult,
  AppError,
  UserPreferences
} from '../index';

describe('Type Validation', () => {
  describe('Team Model', () => {
    it('should accept valid team data', () => {
      const team: Team = {
        id: '123',
        name: 'My Team',
        sportType: 'football',
        playerIds: ['p1', 'p2'],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      expect(team.id).toBe('123');
      expect(team.name).toBe('My Team');
      expect(team.sportType).toBe('football');
      expect(team.playerIds).toHaveLength(2);
    });

    it('should accept team with empty playerIds', () => {
      const team: Team = {
        id: '456',
        name: 'Empty Team',
        sportType: 'basketball',
        playerIds: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      expect(team.playerIds).toHaveLength(0);
    });

    it('should accept all sport types', () => {
      const sportTypes: SportType[] = ['football', 'basketball', 'baseball', 'hockey'];
      
      sportTypes.forEach(sportType => {
        const team: Team = {
          id: `team-${sportType}`,
          name: `${sportType} Team`,
          sportType,
          playerIds: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        expect(team.sportType).toBe(sportType);
      });
    });
  });

  describe('Player Model', () => {
    it('should accept valid player data', () => {
      const player: Player = {
        id: 'p1',
        name: 'John Doe',
        sportType: 'football',
        position: 'QB',
        teamAffiliation: 'Dallas Cowboys',
        statistics: {
          sportType: 'football',
          season: '2024',
          stats: { passingYards: 3500 }
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      expect(player.name).toBe('John Doe');
      expect(player.position).toBe('QB');
      expect(player.teamAffiliation).toBe('Dallas Cowboys');
    });

    it('should accept player with empty statistics', () => {
      const player: Player = {
        id: 'p2',
        name: 'Jane Smith',
        sportType: 'basketball',
        position: 'PG',
        teamAffiliation: 'Lakers',
        statistics: {
          sportType: 'basketball',
          season: '2024',
          stats: {}
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      expect(Object.keys(player.statistics.stats)).toHaveLength(0);
    });
  });

  describe('Statistics Model', () => {
    it('should accept football statistics', () => {
      const stats: FootballStats = {
        passingYards: 3500,
        rushingYards: 1200,
        touchdowns: 25,
        receptions: 80
      };
      
      expect(stats.passingYards).toBe(3500);
      expect(stats.touchdowns).toBe(25);
    });

    it('should accept football statistics with optional interceptions', () => {
      const stats: FootballStats = {
        passingYards: 3500,
        rushingYards: 1200,
        touchdowns: 25,
        receptions: 80,
        interceptions: 10
      };
      
      expect(stats.interceptions).toBe(10);
    });

    it('should accept basketball statistics', () => {
      const stats: BasketballStats = {
        points: 2500,
        rebounds: 800,
        assists: 600,
        steals: 150,
        blocks: 100
      };
      
      expect(stats.points).toBe(2500);
      expect(stats.assists).toBe(600);
    });

    it('should accept baseball statistics', () => {
      const stats: BaseballStats = {
        battingAverage: 0.315,
        homeRuns: 35,
        rbis: 100,
        strikeouts: 150
      };
      
      expect(stats.battingAverage).toBe(0.315);
      expect(stats.homeRuns).toBe(35);
    });

    it('should accept baseball statistics with optional ERA', () => {
      const stats: BaseballStats = {
        battingAverage: 0.250,
        homeRuns: 5,
        rbis: 20,
        era: 3.45,
        strikeouts: 180
      };
      
      expect(stats.era).toBe(3.45);
    });

    it('should accept hockey statistics', () => {
      const stats: HockeyStats = {
        goals: 40,
        assists: 50,
        plusMinus: 15,
        penaltyMinutes: 60,
        saves: 1200
      };
      
      expect(stats.goals).toBe(40);
      expect(stats.plusMinus).toBe(15);
    });

    it('should accept generic statistics with mixed types', () => {
      const stats: Statistics = {
        sportType: 'football',
        season: '2024',
        stats: {
          passingYards: 3500,
          completionPercentage: '65.5%',
          rating: 98.7
        }
      };
      
      expect(typeof stats.stats.passingYards).toBe('number');
      expect(typeof stats.stats.completionPercentage).toBe('string');
    });
  });

  describe('Validation Model', () => {
    it('should accept valid validation result', () => {
      const result: ValidationResult = {
        valid: true,
        errors: []
      };
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept validation result with errors', () => {
      const result: ValidationResult = {
        valid: false,
        errors: [
          { field: 'name', message: 'Name is required' },
          { field: 'sportType', message: 'Invalid sport type' }
        ]
      };
      
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].field).toBe('name');
    });
  });

  describe('Migration Model', () => {
    it('should accept successful migration result', () => {
      const result: MigrationResult = {
        success: true,
        teamsCreated: 5,
        playersCreated: 50,
        errors: []
      };
      
      expect(result.success).toBe(true);
      expect(result.teamsCreated).toBe(5);
      expect(result.playersCreated).toBe(50);
    });

    it('should accept migration result with errors', () => {
      const result: MigrationResult = {
        success: false,
        teamsCreated: 3,
        playersCreated: 25,
        errors: [
          { type: 'team', message: 'Invalid team data', data: {} },
          { type: 'player', message: 'Missing player name', data: {} }
        ]
      };
      
      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].type).toBe('team');
    });
  });

  describe('Error Model', () => {
    it('should accept all error types', () => {
      const errorTypes = ['validation', 'storage', 'migration', 'not_found', 'configuration'] as const;
      
      errorTypes.forEach(type => {
        const error: AppError = {
          type,
          message: `Test ${type} error`,
          timestamp: new Date()
        };
        
        expect(error.type).toBe(type);
      });
    });

    it('should accept error with optional details', () => {
      const error: AppError = {
        type: 'storage',
        message: 'Storage quota exceeded',
        details: { quota: 5000000, used: 5100000 },
        timestamp: new Date()
      };
      
      expect(error.details).toBeDefined();
      expect(error.details.quota).toBe(5000000);
    });
  });

  describe('UserPreferences Model', () => {
    it('should accept valid user preferences', () => {
      const prefs: UserPreferences = {
        defaultSport: 'football',
        theme: 'dark',
        sortPreference: 'name'
      };
      
      expect(prefs.defaultSport).toBe('football');
      expect(prefs.theme).toBe('dark');
    });

    it('should accept light theme', () => {
      const prefs: UserPreferences = {
        defaultSport: 'basketball',
        theme: 'light',
        sortPreference: 'date'
      };
      
      expect(prefs.theme).toBe('light');
    });
  });

  describe('Edge Cases', () => {
    it('should handle dates correctly', () => {
      const now = new Date();
      const team: Team = {
        id: '1',
        name: 'Test',
        sportType: 'football',
        playerIds: [],
        createdAt: now,
        updatedAt: now
      };
      
      expect(team.createdAt).toBeInstanceOf(Date);
      expect(team.updatedAt).toBeInstanceOf(Date);
      expect(team.createdAt.getTime()).toBe(now.getTime());
    });

    it('should handle empty arrays', () => {
      const team: Team = {
        id: '1',
        name: 'Test',
        sportType: 'football',
        playerIds: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      expect(Array.isArray(team.playerIds)).toBe(true);
      expect(team.playerIds).toHaveLength(0);
    });

    it('should handle empty objects in stats', () => {
      const stats: Statistics = {
        sportType: 'football',
        season: '2024',
        stats: {}
      };
      
      expect(typeof stats.stats).toBe('object');
      expect(Object.keys(stats.stats)).toHaveLength(0);
    });
  });
});

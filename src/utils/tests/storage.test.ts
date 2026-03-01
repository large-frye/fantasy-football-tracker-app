import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import * as storage from '../storage';
import type { Team, Player } from '../../models';

// Mock localStorage for testing
class LocalStorageMock {
  private store: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get length(): number {
    return this.store.size;
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys());
    return keys[index] ?? null;
  }
}

describe('Storage Utility', () => {
  let localStorageMock: LocalStorageMock;

  beforeEach(() => {
    localStorageMock = new LocalStorageMock();
    global.localStorage = localStorageMock as any;
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe('Property 8: Data persistence round-trip', () => {
    it('Feature: fantasy-sports-tracker, Property 8: Data persistence round-trip - Team objects', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 1, maxLength: 50 }),
            sportType: fc.constantFrom('football', 'basketball', 'baseball', 'hockey'),
            playerIds: fc.array(fc.uuid(), { maxLength: 20 }),
            createdAt: fc.date(),
            updatedAt: fc.date()
          }),
          (teamData) => {
            const key = `test-team-${teamData.id}`;
            
            // Store the team
            storage.set<Team>(key, teamData as Team);
            
            // Retrieve the team
            const retrieved = storage.get<Team>(key);
            
            // Verify equivalence
            expect(retrieved).not.toBeNull();
            expect(retrieved?.id).toBe(teamData.id);
            expect(retrieved?.name).toBe(teamData.name);
            expect(retrieved?.sportType).toBe(teamData.sportType);
            expect(retrieved?.playerIds).toEqual(teamData.playerIds);
            
            // Note: Dates are serialized as strings, so we compare ISO strings
            expect(new Date(retrieved!.createdAt).toISOString()).toBe(teamData.createdAt.toISOString());
            expect(new Date(retrieved!.updatedAt).toISOString()).toBe(teamData.updatedAt.toISOString());
            
            // Clean up
            storage.remove(key);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Feature: fantasy-sports-tracker, Property 8: Data persistence round-trip - Player objects', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 1, maxLength: 50 }),
            sportType: fc.constantFrom('football', 'basketball', 'baseball', 'hockey'),
            position: fc.string({ minLength: 1, maxLength: 10 }),
            teamAffiliation: fc.string({ minLength: 1, maxLength: 50 }),
            statistics: fc.record({
              sportType: fc.constantFrom('football', 'basketball', 'baseball', 'hockey'),
              season: fc.string({ minLength: 4, maxLength: 10 }),
              stats: fc.dictionary(
                fc.string({ minLength: 1, maxLength: 20 }),
                fc.oneof(fc.integer({ min: 0, max: 10000 }), fc.double({ min: 0, max: 1000, noNaN: true }))
              )
            }),
            createdAt: fc.date(),
            updatedAt: fc.date()
          }),
          (playerData) => {
            const key = `test-player-${playerData.id}`;
            
            // Store the player
            storage.set<Player>(key, playerData as Player);
            
            // Retrieve the player
            const retrieved = storage.get<Player>(key);
            
            // Verify equivalence
            expect(retrieved).not.toBeNull();
            expect(retrieved?.id).toBe(playerData.id);
            expect(retrieved?.name).toBe(playerData.name);
            expect(retrieved?.sportType).toBe(playerData.sportType);
            expect(retrieved?.position).toBe(playerData.position);
            expect(retrieved?.teamAffiliation).toBe(playerData.teamAffiliation);
            expect(retrieved?.statistics.sportType).toBe(playerData.statistics.sportType);
            expect(retrieved?.statistics.season).toBe(playerData.statistics.season);
            expect(retrieved?.statistics.stats).toEqual(playerData.statistics.stats);
            
            // Dates comparison
            expect(new Date(retrieved!.createdAt).toISOString()).toBe(playerData.createdAt.toISOString());
            expect(new Date(retrieved!.updatedAt).toISOString()).toBe(playerData.updatedAt.toISOString());
            
            // Clean up
            storage.remove(key);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Feature: fantasy-sports-tracker, Property 8: Data persistence round-trip - Primitive types', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.string(),
            fc.integer(),
            fc.double({ noNaN: true }),
            fc.boolean(),
            fc.array(fc.string()),
            fc.array(fc.integer()),
            fc.dictionary(fc.string(), fc.string())
          ),
          fc.uuid(),
          (value, keyId) => {
            const key = `test-primitive-${keyId}`;
            
            // Store the value
            storage.set(key, value);
            
            // Retrieve the value
            const retrieved = storage.get(key);
            
            // Verify equivalence
            expect(retrieved).toEqual(value);
            
            // Clean up
            storage.remove(key);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('Feature: fantasy-sports-tracker, Property 8: Data persistence round-trip - Complex nested objects', () => {
      fc.assert(
        fc.property(
          fc.record({
            teams: fc.dictionary(
              fc.uuid(),
              fc.record({
                id: fc.uuid(),
                name: fc.string({ minLength: 1, maxLength: 50 }),
                sportType: fc.constantFrom('football', 'basketball', 'baseball', 'hockey'),
                playerIds: fc.array(fc.uuid(), { maxLength: 10 })
              })
            ),
            players: fc.dictionary(
              fc.uuid(),
              fc.record({
                id: fc.uuid(),
                name: fc.string({ minLength: 1, maxLength: 50 }),
                sportType: fc.constantFrom('football', 'basketball', 'baseball', 'hockey')
              })
            )
          }),
          fc.uuid(),
          (complexData, keyId) => {
            const key = `test-complex-${keyId}`;
            
            // Store the complex object
            storage.set(key, complexData);
            
            // Retrieve the complex object
            const retrieved = storage.get(key);
            
            // Verify equivalence
            expect(retrieved).toEqual(complexData);
            
            // Clean up
            storage.remove(key);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});

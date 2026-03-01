/**
 * Storage utility for localStorage abstraction
 * Provides error handling, serialization, and quota management
 */

export class StorageError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Get an item from localStorage
 * @param key - Storage key
 * @returns Parsed value or null if not found
 */
export function get<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new StorageError(`Failed to parse stored data for key "${key}"`, error);
    }
    throw new StorageError(`Failed to retrieve item with key "${key}"`, error);
  }
}

/**
 * Set an item in localStorage
 * @param key - Storage key
 * @param value - Value to store (will be JSON serialized)
 */
export function set<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new StorageError(
        'Storage quota exceeded. Please clear some data and try again.',
        error
      );
    }
    if (error instanceof TypeError) {
      throw new StorageError(`Failed to serialize value for key "${key}"`, error);
    }
    throw new StorageError(`Failed to store item with key "${key}"`, error);
  }
}

/**
 * Remove an item from localStorage
 * @param key - Storage key
 */
export function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new StorageError(`Failed to remove item with key "${key}"`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    throw new StorageError('Failed to clear storage', error);
  }
}

/**
 * Check if a key exists in localStorage
 * @param key - Storage key
 * @returns true if key exists, false otherwise
 */
export function has(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    throw new StorageError(`Failed to check existence of key "${key}"`, error);
  }
}

/**
 * Get all keys from localStorage
 * @returns Array of all storage keys
 */
export function keys(): string[] {
  try {
    const allKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        allKeys.push(key);
      }
    }
    return allKeys;
  } catch (error) {
    throw new StorageError('Failed to retrieve storage keys', error);
  }
}

/**
 * Get the size of stored data in bytes (approximate)
 * @returns Approximate size in bytes
 */
export function getSize(): number {
  try {
    let size = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null) {
        const value = localStorage.getItem(key);
        if (value !== null) {
          // Approximate size: key + value in UTF-16 (2 bytes per char)
          size += (key.length + value.length) * 2;
        }
      }
    }
    return size;
  } catch (error) {
    throw new StorageError('Failed to calculate storage size', error);
  }
}

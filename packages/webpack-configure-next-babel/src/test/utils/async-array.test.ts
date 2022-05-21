import { describe, expect, it } from '@jest/globals';
import asyncArray from '../utils/async-array';

describe('asyncArray', (): void => {
  it('should asynchronously return an empty array', async (): Promise<void> => {
    expect(await asyncArray()).toEqual([]);
  });
});

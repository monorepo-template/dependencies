import returnNull from '../utils/return-null';

describe('returnNull', (): void => {
  it('should return null', (): void => {
    expect(returnNull()).toBeNull();
  });
});

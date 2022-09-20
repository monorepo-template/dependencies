import returnEmpty from './return-empty';

describe('returnEmpty', (): void => {
  it('should return an empty object', (): void => {
    expect(returnEmpty()).toStrictEqual({});
  });
});

import validateArray from './validate-array';

describe('validateArray', (): void => {
  it('should throw an error when passed a non-array', (): void => {
    expect((): void => {
      validateArray('');
    }).toThrowError('Expected an array.');
  });
});

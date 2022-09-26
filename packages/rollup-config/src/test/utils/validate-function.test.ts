import validateFunction from './validate-function';

describe('validateFunction', (): void => {
  it('should throw an error when passed a non-function', (): void => {
    expect((): void => {
      validateFunction('');
    }).toThrowError('Expected a function.');
  });
});

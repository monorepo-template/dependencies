import validateDefined from './validate-defined';

describe('validateDefined', (): void => {
  it('should throw an error when passed undefined', (): void => {
    expect((): void => {
      validateDefined(undefined);
    }).toThrowError('Expected value to be defined.');
  });
});

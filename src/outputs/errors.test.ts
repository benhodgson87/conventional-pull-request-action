import { error } from '@actions/core';
import { errorPrTitle } from './errors';

jest.mock('@actions/core', () => ({
  error: jest.fn()
}));

describe('Error outputs', () => {
  it('`errorPrTitle` should pass the expected error to the output', () => {
    errorPrTitle(`Definitely isn't right!!`);
    expect(error).toHaveBeenCalledWith(
      `⛔️ PR title: Definitely isn't right!!`
    );
  });
});

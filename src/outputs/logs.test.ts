import { info } from '@actions/core';
import { logPrTitleFound } from './logs';

jest.mock('@actions/core', () => ({
  info: jest.fn()
}));

describe('Log outputs', () => {
  it('`logPrTitleFound` should pass the expected log to the output', () => {
    logPrTitleFound(`fix(CDV-2812): Get with friends`);
    expect(info).toHaveBeenCalledWith(
      `Found PR title: "fix(CDV-2812): Get with friends"`
    );
  });
});

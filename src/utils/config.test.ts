import { beforeEach, describe, expect, it } from 'vitest';
import { getActionConfig } from './config';

describe('Config utils', () => {
  beforeEach(() => {
    delete process.env.INPUT_SCOPEREGEX;
    process.env.INPUT_COMMITLINTRULESPATH = './commitlint.rules.js';
    process.env.GITHUB_TOKEN = 'asdf';
    process.env.GITHUB_WORKSPACE = './';
  });

  it('`getActionConfig` returns a valid config object with required values', () => {
    const config = getActionConfig();
    expect(config).toMatchObject({
      RULES_PATH: expect.any(String),
      GITHUB_TOKEN: expect.any(String),
      GITHUB_WORKSPACE: expect.any(String)
    });
  });

  it('`getActionConfig` returns a valid config object when the scopeRegex arg is provided', () => {
    process.env.INPUT_SCOPEREGEX = '[A-Z]+-[0-9]+';

    const config = getActionConfig();
    expect(config).toMatchObject({
      SCOPE_REGEX: expect.any(RegExp),
      RULES_PATH: expect.any(String),
      GITHUB_TOKEN: expect.any(String),
      GITHUB_WORKSPACE: expect.any(String)
    });
  });
});

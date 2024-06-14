import { setFailed } from '@actions/core';
import * as github from '@actions/github';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { lint } from './lint';

vi.mock('@actions/core', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/core')>();
  const error = vi.fn();
  return {
    ...mod,
    default: { error },
    getInput: vi.fn(),
    getBooleanInput: vi.fn().mockImplementation(name => {
      switch (name) {
        case 'dry-run':
          return false;
      }
    }),
    setFailed: vi.fn(),
    debug: vi.fn(),
    notice: vi.fn()
  };
});

vi.mock('@actions/github', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/github')>();
  const getOctokit = vi.fn().mockReturnValue({
    pulls: {
      get: vi.fn().mockReturnValue({
        data: {
          commits: 1,
          title: 'feat(FOO-123): some commit message'
        }
      })
    }
  });

  return {
    ...mod,
    default: { getOctokit },
    getOctokit
  };
});

describe('Linter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env.INPUT_SCOPEPREFIXES = undefined;
    process.env.INPUT_COMMITLINTRULESPATH = undefined;
    process.env.GITHUB_TOKEN = undefined;
    process.env.GITHUB_WORKSPACE = undefined;
  });

  it('should fail if `` is missing ', async () => {
    process.env.INPUT_SCOPEPREFIXES = "['FOO-']";
    process.env.INPUT_COMMITLINTRULESPATH = './rules.json';
    process.env.GITHUB_TOKEN = 'TOKEN';
    process.env.GITHUB_WORKSPACE = './';

    await lint();

    expect(setFailed).toHaveBeenCalledWith('afadsgasdga');
  });
});

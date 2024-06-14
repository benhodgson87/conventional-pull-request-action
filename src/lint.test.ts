import { setFailed } from '@actions/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { lint } from './lint';

vi.mock('@actions/core', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/core')>();
  const error = vi.fn();
  const info = vi.fn(title => {
    return `Found PR title: "${title}"`;
  });
  const warning = vi.fn((warning) => console.warn(`${warning}`));
  const setFailed = vi.fn((failure) => console.error(`${failure}`));
  return {
    ...mod,
    default: { error, info, warning, setFailed },
    setFailed,
    info,
    warning
  };
});

vi.mock('@actions/github', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/github')>();
  const getOctokit = vi.fn(() => ({
    rest: {
      pulls: {
        get: vi.fn().mockReturnValue({
          data: {
            commits: 1,
            title: 'feat(BAR-1234): Some commit message'
          }
        })
      }
    }
  }));

  const context = {
    eventName: 'pull_request',
    payload: {
      pull_request: {
        number: 1234,
        title: '',
        base: {
          user: { login: 'bob_cratchett' },
          repo: { name: 'http://github.com/bob_cratchett/stuff' }
        }
      }
    }
  };

  return {
    ...mod,
    default: { getOctokit, context },
    getOctokit,
    context
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

  it('should fail if `INPUT_SCOPEPREFIXES` is missing ', async () => {
    process.env.INPUT_SCOPEPREFIXES = `["FOO-","BANANAS-"]`;
    process.env.INPUT_COMMITLINTRULESPATH =
      './src/fixtures/commitlint.rules.js';
    process.env.GITHUB_TOKEN = 'TOKEN';
    process.env.GITHUB_WORKSPACE = './';

    await lint();

    expect(setFailed).toHaveBeenCalledWith(
      '⛔️ PR title must contain a scope with a ticket number containing one of FOO-, BANANAS-'
    );
  });

  it('should pass if `INPUT_SCOPEPREFIXES` is present ', async () => {
    process.env.INPUT_SCOPEPREFIXES = `["BAR-"]`;
    process.env.INPUT_COMMITLINTRULESPATH =
      './src/fixtures/commitlint.rules.js';
    process.env.GITHUB_TOKEN = 'TOKEN';
    process.env.GITHUB_WORKSPACE = './';

    await lint();

    expect(setFailed).not.toHaveBeenCalled();
  });
});

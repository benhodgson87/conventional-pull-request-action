import { setFailed } from '@actions/core';
import * as github from '@actions/github';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { lint } from './lint';

vi.mock('@actions/core', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/core')>();

  const error = vi.fn();
  const info = vi.fn(title => {
    return `Found PR title: "${title}"`;
  });
  const warning = vi.fn(warning => console.log(`${warning}\n\n`));
  const setFailed = vi.fn();

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
            title: 'feat(BAR-1234): some commit message'
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

  it('should fail if `` is missing ', async () => {
    process.env.INPUT_SCOPEPREFIXES = `["FOO-"]`;
    process.env.INPUT_COMMITLINTRULESPATH =
      './src/fixtures/commitlint.rules.js';
    process.env.GITHUB_TOKEN = 'TOKEN';
    process.env.GITHUB_WORKSPACE = './';

    await lint();

    expect(setFailed).toHaveBeenCalledWith(
      '⛔️ Pull request title does not conform to the conventional commit spec'
    );
  });
});

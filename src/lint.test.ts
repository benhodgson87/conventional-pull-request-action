import { setFailed, warning, error, info } from '@actions/core';
import { getOctokit } from '@actions/github';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { lint } from './lint';

const mocks = vi.hoisted(() => {
  return {
    getOctokit: vi.fn()
  };
});

vi.mock('@actions/core', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/core')>();
  const error = vi.fn();
  const info = vi.fn();
  const warning = vi.fn();
  const setFailed = vi.fn();

  return {
    ...mod,
    default: { error, info, warning, setFailed },
    setFailed,
    info,
    warning,
    error
  };
});

vi.mock('@actions/github', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/github')>();

  const context = {
    eventName: 'pull_request',
    payload: {
      pull_request: {
        number: 1234,
        base: {
          user: { login: 'bob_cratchett' },
          repo: { name: 'http://github.com/bob_cratchett/stuff' }
        }
      }
    }
  };

  return {
    ...mod,
    default: { getOctokit: mocks.getOctokit, context },
    getOctokit: mocks.getOctokit,
    context
  };
});

const mockArgs = [
  'TOKEN',
  './',
  undefined,
  './src/fixtures/commitlint.rules.js'
];

describe('Linter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('should skip the API request if PR title provided as an arg and log the PR title', async () => {
    mocks.getOctokit.mockImplementation(vi.fn());

    const mockArgsWithManualTitle = [
      ...mockArgs.filter(arg => arg).slice(0, 2),
      'chore(FOO-1234): hello i am a valid title passed manually',
      ...mockArgs
        .filter(arg => arg)
        .slice(2, mockArgs.filter(arg => arg).length)
    ];

    await lint.apply(null, mockArgsWithManualTitle);

    expect(getOctokit).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalledWith(
      '🕵️ Found PR title in action args: "chore(FOO-1234): hello i am a valid title passed manually"'
    );
  });

  it('should retrieve the pull request from the API if not passed as an arg and log the PR title', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title: 'feat(BAR-1234): hello i am a valid title from the API'
            }
          })
        }
      }
    });

    await lint.apply(null, mockArgs);

    expect(getOctokit).toHaveBeenCalledWith(mockArgs[0]);
    expect(info).toHaveBeenCalledWith(
      '🕵️ Found PR title from Github API: "feat(BAR-1234): hello i am a valid title from the API"'
    );
  });

  it.each([
    'fix: Subject is valid',
    'feat(BAR-1234): Subject is valid',
    'feat!: Subject is valid'
  ])(
    'should output a success message if PR title is valid: %s',
    async title => {
      mocks.getOctokit.mockReturnValue({
        rest: {
          pulls: {
            get: vi.fn().mockReturnValue({
              data: {
                commits: 1,
                title
              }
            })
          }
        }
      });

      await lint.apply(null, mockArgs);

      expect(info).toHaveBeenCalledWith(
        '📋 Found custom commitlint rules file at "./src/fixtures/commitlint.rules.js". Checking PR title with commitlint'
      );
      expect(info).toHaveBeenLastCalledWith(
        '✅ PR title validated successfully'
      );

      expect(error).not.toHaveBeenCalled();
      expect(warning).not.toHaveBeenCalled();
      expect(setFailed).not.toHaveBeenCalled();
    }
  );

  it('should output a success message if PR title is valid and no custom rules are provided', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title: 'fix: commit title is valid'
            }
          })
        }
      }
    });

    await lint.apply(
      null,
      mockArgs.filter(arg => arg && !arg.includes('commitlint.rules.js'))
    );

    expect(info).toHaveBeenCalledWith('📋 Checking PR title with commitlint');
    expect(info).toHaveBeenLastCalledWith('✅ PR title validated successfully');

    expect(error).not.toHaveBeenCalled();
    expect(warning).not.toHaveBeenCalled();
    expect(setFailed).not.toHaveBeenCalled();
  });

  it('should fail and output an error if title does not have a type', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title: 'this is not a conventional commit'
            }
          })
        }
      }
    });

    await lint.apply(null, mockArgs);

    expect(error).toHaveBeenCalledWith('⛔️ Commitlint: type may not be empty');
    expect(setFailed).toHaveBeenCalledWith(
      '🛑 Pull request title does not conform to the conventional commit spec'
    );
  });

  it('should fail and output an error if title does not pass a custom error rule', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title: 'feat(BAR-1234): TITLES SHOULD BE LOWERCASE'
            }
          })
        }
      }
    });

    await lint.apply(null, mockArgs);

    expect(error).toHaveBeenCalledWith(
      '⛔️ Commitlint: subject must not be upper-case'
    );
    expect(setFailed).toHaveBeenCalledWith(
      '🛑 Pull request title does not conform to the conventional commit spec'
    );
  });

  it('should pass and output a warning if title does not pass a custom warning rule', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title:
                'feat(BAR-1234): subject should not be longer than 20 characters long'
            }
          })
        }
      }
    });

    await lint.apply(null, mockArgs);

    expect(warning).toHaveBeenCalledWith(
      '⚠️ Commitlint: subject must not be longer than 20 characters'
    );
    expect(info).toHaveBeenLastCalledWith(
      '✅ PR title validated with warnings'
    );
    expect(setFailed).not.toHaveBeenCalled();
  });

  it('should fail if the title is a valid conventional commit but a correct scope pattern is missing', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title:
                'feat(QUX-1234): subject should not be longer than 20 characters long'
            }
          })
        }
      }
    });

    await lint.apply(null, [
      ...mockArgs,
      undefined,
      new RegExp(`\\b(FOO|BAR|BAZ)\\b-[0-9]+`, 'g')
    ]);

    expect(setFailed).toHaveBeenCalledWith(
      '🛑 PR title must contain a scope which matches the regular expression: /\\b(FOO|BAR|BAZ)\\b-[0-9]+/g'
    );
  });

  it('should pass if the title is a valid conventional commit and a correct scope pattern is present', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title:
                'feat(FOO-123): subject should not be longer than 20 characters long'
            }
          })
        }
      }
    });

    await lint.apply(null, [
      ...mockArgs,
      undefined,
      new RegExp(`\\b(FOO|BAR|BAZ)\\b-[0-9]+`, 'g')
    ]);

    expect(info).toHaveBeenCalledWith(
      `👀 Found scope "FOO-123". Linting with "/\\b(FOO|BAR|BAZ)\\b-[0-9]+/g\"`
    );
    expect(setFailed).not.toHaveBeenCalled();
  });

  it('should pass if the title is a valid conventional commit and a correct scope pattern is present for a required type', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title:
                'feat(FOO-123): subject should not be longer than 20 characters long'
            }
          })
        }
      }
    });

    await lint.apply(null, [
      ...mockArgs,
      ['feat', 'fix'],
      new RegExp(`\\b(FOO|BAR|BAZ)\\b-[0-9]+`, 'g')
    ]);

    expect(info).toHaveBeenCalledWith(
      `👀 Found scope "FOO-123". Linting with "/\\b(FOO|BAR|BAZ)\\b-[0-9]+/g\"`
    );
    expect(info).toHaveBeenLastCalledWith(
      '✅ PR title validated with warnings'
    );
    expect(setFailed).not.toHaveBeenCalled();
  });

  it('should pass if the title is a valid conventional commit and type is omitted from scope checks', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title: 'chore: valid subject'
            }
          })
        }
      }
    });

    await lint.apply(null, [
      ...mockArgs,
      ['feat', 'fix'],
      new RegExp(`\\b(FOO|BAR|BAZ)\\b-[0-9]+`, 'g')
    ]);

    expect(info).toHaveBeenCalledWith(
      `⏩ Skipping scope check for type "chore"`
    );
    expect(info).toHaveBeenLastCalledWith('✅ PR title validated successfully');
    expect(setFailed).not.toHaveBeenCalled();
  });

  it('should fail if the title is a valid conventional commit but scope is missing for a required type', async () => {
    mocks.getOctokit.mockReturnValue({
      rest: {
        pulls: {
          get: vi.fn().mockReturnValue({
            data: {
              commits: 1,
              title: 'chore: subject is valid'
            }
          })
        }
      }
    });

    await lint.apply(null, [
      ...mockArgs,
      ['feat', 'fix', 'chore'],
      new RegExp(`\\b(FOO|BAR|BAZ)\\b-[0-9]+`, 'g')
    ]);

    expect(setFailed).toHaveBeenCalledWith(
      `🛑 PR title of type 'chore' must contain a scope`
    );
  });
});

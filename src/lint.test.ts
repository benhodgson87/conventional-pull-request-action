import { setFailed } from '@actions/core';
import * as github from '@actions/github';
import { lint } from './lint';

jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  getBooleanInput: jest.fn().mockImplementation(name => {
    switch (name) {
      case 'dry-run':
        return false;
    }
  }),
  setFailed: jest.fn(),
  debug: jest.fn(),
  notice: jest.fn()
}));

jest.mock('@actions/github', () => ({
  __esModule: true,
  getOctokit: jest.fn().mockReturnValue({
    pulls: {
      get: jest.fn().mockReturnValue({
        data: {
          commits: 1,
          title: 'feat(FOO-123): some commit message'
        }
      })
    }
  })
}));

describe('Linter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
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

    github.context.payload.pull_request = {
      title: 'feat: Disallow ending of friendship',
      number: 1234
    };

    await lint();

    expect(setFailed).toHaveBeenCalledWith('afadsgasdga');
  });
});

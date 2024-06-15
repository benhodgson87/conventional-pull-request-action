import { setFailed } from '@actions/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  setFailedPrNotFound,
  setFailedMissingToken,
  setFailedDoesNotMatchSpec,
  setFailedScopeNotValid
} from './fails';

vi.mock('@actions/core', async importOriginal => {
  const mod = await importOriginal<typeof import('@actions/core')>();
  const setFailed = vi.fn();
  return {
    ...mod,
    default: { setFailed },
    setFailed
  };
});

describe('Failure outputs', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('`setFailedPrNotFound` should pass the expected error to the output ', () => {
    setFailedPrNotFound();
    expect(setFailed).toHaveBeenCalledWith(
      `🛑 Pull request not found. Use pull request event to trigger this action`
    );
  });

  it('`setFailedMissingToken` should pass the expected error to the output', () => {
    setFailedMissingToken();
    expect(setFailed).toHaveBeenCalledWith(
      `🛑 Could not find Github Token. Ensure you have passed a valid 'GITHUB_TOKEN' value to the action.`
    );
  });

  it('`setFailedDoesNotMatchSpec` should pass the expected error to the output', () => {
    setFailedDoesNotMatchSpec();
    expect(setFailed).toHaveBeenCalledWith(
      `🛑 Pull request title does not conform to the conventional commit spec`
    );
  });

  it('`setFailedDoesNotMatchSpec` should pass the expected error to the output with given arguments', () => {
    setFailedScopeNotValid('/needle/g');
    expect(setFailed).toHaveBeenCalledWith(
      `🛑 PR title must contain a scope which matches the regular expression: /needle/g`
    );
  });
});

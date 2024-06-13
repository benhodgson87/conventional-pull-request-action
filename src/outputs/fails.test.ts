import { setFailed } from '@actions/core';
import {
  setFailedPrNotFound,
  setFailedMissingToken,
  setFailedDoesNotMatchSpec,
  setFailedScopeNotValid
} from './fails';

jest.mock('@actions/core', () => ({
  setFailed: jest.fn()
}));

describe('Failure outputs', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('`setFailedPrNotFound` should pass the expected error to the output ', () => {
    setFailedPrNotFound();
    expect(setFailed).toHaveBeenCalledWith(
      `⛔️ Pull request not found. Use pull request event to trigger this action`
    );
  });

  it('`setFailedMissingToken` should pass the expected error to the output', () => {
    setFailedMissingToken();
    expect(setFailed).toHaveBeenCalledWith(
      `⛔️ Could not find Github Token. Ensure you have passed a valid 'GITHUB_TOKEN' value to the action.`
    );
  });

  it('`setFailedDoesNotMatchSpec` should pass the expected error to the output', () => {
    setFailedDoesNotMatchSpec();
    expect(setFailed).toHaveBeenCalledWith(
      `⛔️ Pull request title does not conform to the conventional commit spec`
    );
  });

  it('`setFailedDoesNotMatchSpec` should pass the expected error to the output with given arguments', () => {
    setFailedScopeNotValid(['SCARY-', 'SPORTY-', 'BABY-', 'GINGER-', 'POSH-']);
    expect(setFailed).toHaveBeenCalledWith(
      `⛔️ PR title must contain a scope with a ticket number containing one of SCARY- / SPORTY- / BABY- / GINGER- / POSH-`
    );
  });
});

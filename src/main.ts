import core from '@actions/core';
import { lint } from './lint';
import { getActionConfig } from './utils/config';

(async () => {
  try {
    const {
      githubToken,
      githubWorkspace,
      rulesPath,
      enforcedScopeTypes,
      scopeRegex
    } = getActionConfig();

    await lint(
      githubToken,
      githubWorkspace,
      rulesPath,
      enforcedScopeTypes,
      scopeRegex
    );
  } catch (e) {
    core.setFailed(`Failed to run action with error: ${e}`);
  }
})();

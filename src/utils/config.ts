export const getActionConfig = () => {
  if (process.env.INPUT_SCOPEREGEX) {
    try {
      const scopeRegex = new RegExp(process.env.INPUT_SCOPEREGEX, 'i');

      return {
        SCOPE_REGEX: scopeRegex,
        RULES_PATH: process.env.INPUT_COMMITLINTRULESPATH,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        GITHUB_WORKSPACE: process.env.GITHUB_WORKSPACE
      };
    } catch (e) {
      console.error('Failed to convert scopeRegex to valid RegExp', e);
    }
  }

  return {
    RULES_PATH: process.env.INPUT_COMMITLINTRULESPATH,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_WORKSPACE: process.env.GITHUB_WORKSPACE
  };
};

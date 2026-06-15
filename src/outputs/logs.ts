import * as core from '@actions/core';
import type { Commit } from 'conventional-commits-parser';

export const logPrTitleFound = (title: string) =>
  core.info(`🕵️ Found PR title: "${title}"`);

export const logLintingPrTitle = () =>
  core.info(`📋 Checking PR title with commitlint`);

export const logLintingPrTitleWithCustomRules = (path: string) =>
  core.info(
    `📋 Found custom commitlint rules file at "${path}". Checking PR title with commitlint`
  );

export const logLintableScopeFound = (
  scope: Commit.Field | string,
  regex: string
) => core.info(`👀 Found scope "${scope}". Linting with "${regex}"`);

export const logActionSuccessful = (hasWarnings: boolean = false) =>
  core.info(
    `✅ PR title validated ${hasWarnings ? 'with warnings' : 'successfully'}`
  );

export const logScopeCheckSkipped = (type: string) =>
  core.info(`⏩ Skipping scope check for type "${type}"`);

import * as core from '@actions/core';
import { Commit } from 'conventional-commits-parser';

export const logPrTitleFound = (title: string) =>
  core.info(`🕵️ Found PR title: "${title}"`);

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

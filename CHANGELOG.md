# Changelog

## [2.0.0](https://github.com/benhodgson87/conventional-pull-request-action/compare/v1.2.0...v2.0.0) (2026-05-27)


### ⚠ BREAKING CHANGES

* Update action runtime to Node.js 24 (requires `node24` runner)


### Bug Fixes

* Incorrect error message on scope type parser


## [1.2.0](https://github.com/benhodgson87/conventional-pull-request-action/compare/v1.1.0...v1.2.0) (2026-05-27)


## [1.1.0](https://github.com/benhodgson87/conventional-pull-request-action/compare/v1.0.0...v1.1.0) (2026-05-27)


### Features

* Add additional log outputs and use consistent double/single quotes


## [1.0.0](https://github.com/benhodgson87/conventional-pull-request-action/compare/v0.1.3...v1.0.0) (2026-05-27)


### Features

* Switch to regex for scope matching
* Add success message
* Improve output of missing rules path error


### Bug Fixes

* Allow breaking change in titles
* Continue with standard rules when custom rules missing
* Missing workspace has misleading error message


### Code Refactoring

* Refactor action to v1 architecture


## [0.1.3](https://github.com/benhodgson87/conventional-pull-request-action/releases/tag/v0.1.3) (2026-05-27)


### Features

* Add \`ignoreCommits\` config to skip single-commit linting when PR title matches commit subject
* Echo found PR title in action output


### Bug Fixes

* Use \`config-conventional\` parserOpts
* Check PR title and commit subject equality correctly

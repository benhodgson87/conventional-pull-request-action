# Changelog

## [3.0.0](https://github.com/benhodgson87/conventional-pull-request-action/compare/v2.0.1...v3.0.0) (2026-06-15)


### ⚠ BREAKING CHANGES

* Update action runtime to Node.js 24 ([#24](https://github.com/benhodgson87/conventional-pull-request-action/issues/24))

### Features

* Add action and deps ([#1](https://github.com/benhodgson87/conventional-pull-request-action/issues/1)) ([2ae9651](https://github.com/benhodgson87/conventional-pull-request-action/commit/2ae9651614d7ddb446207063dfb4b47abdeced61))
* Add additional log outputs + use consistent double/single quotes ([#18](https://github.com/benhodgson87/conventional-pull-request-action/issues/18)) ([eb05e38](https://github.com/benhodgson87/conventional-pull-request-action/commit/eb05e38a7727ed221bfb4de6ad6ead56c36cbdab))
* Add Apache License ([#3](https://github.com/benhodgson87/conventional-pull-request-action/issues/3)) ([d1987f7](https://github.com/benhodgson87/conventional-pull-request-action/commit/d1987f73b99e8c54ddc46b5e230c9188fdc0ffb3))
* Add ignoreCommits config value to skip single commit linting wh… ([33c6b53](https://github.com/benhodgson87/conventional-pull-request-action/commit/33c6b530cd9e9cc9cf4bce26bfd58f946ca151e7))
* Add ignoreCommits config value to skip single commit linting when unnecessary ([f113a40](https://github.com/benhodgson87/conventional-pull-request-action/commit/f113a403dcd5c589f1853f4928a3811053e967ba))
* Add success message ([#11](https://github.com/benhodgson87/conventional-pull-request-action/issues/11)) ([12c33a9](https://github.com/benhodgson87/conventional-pull-request-action/commit/12c33a905404eca7f2e0b404d0d6d1b43e31b0d5))
* Echo the found PR title ([#16](https://github.com/benhodgson87/conventional-pull-request-action/issues/16)) ([9fe307d](https://github.com/benhodgson87/conventional-pull-request-action/commit/9fe307d4fdb5c23c67a3563d3da40923ea0dd406))
* Improve output of missing rules path error ([8c0836e](https://github.com/benhodgson87/conventional-pull-request-action/commit/8c0836e0748c0569c192d9bf24745a69a4f0e1cd))
* Refactor action to v1 ([#2](https://github.com/benhodgson87/conventional-pull-request-action/issues/2)) ([093fb62](https://github.com/benhodgson87/conventional-pull-request-action/commit/093fb6255681242924197bbe84c03586ea00de15))
* Switch to regex for scope matching ([#9](https://github.com/benhodgson87/conventional-pull-request-action/issues/9)) ([a96028b](https://github.com/benhodgson87/conventional-pull-request-action/commit/a96028b521b7ed05b66ed7e6467efee91ee7b23f))
* Update action runtime to Node.js 24 ([#24](https://github.com/benhodgson87/conventional-pull-request-action/issues/24)) ([37a9125](https://github.com/benhodgson87/conventional-pull-request-action/commit/37a91250e08f8f957f25fb29160dcf46a6debc99))


### Bug Fixes

* Add missing dep, add workflow event trigger ([#4](https://github.com/benhodgson87/conventional-pull-request-action/issues/4)) ([274b900](https://github.com/benhodgson87/conventional-pull-request-action/commit/274b900a42d548f09d45afebdcd2caf346727021))
* Add vitest config ([1df68b8](https://github.com/benhodgson87/conventional-pull-request-action/commit/1df68b8e5049bd1342f037616919548290a1f583))
* Allow breaking change in titles ([#12](https://github.com/benhodgson87/conventional-pull-request-action/issues/12)) ([dca3b4c](https://github.com/benhodgson87/conventional-pull-request-action/commit/dca3b4c5f25c5efc1221a051057fc4eb34a31cca))
* Await lint() to ensure errors are caught correctly ([#28](https://github.com/benhodgson87/conventional-pull-request-action/issues/28)) ([c7d49ab](https://github.com/benhodgson87/conventional-pull-request-action/commit/c7d49ab6c15c815e2cb2ae15235560e13c80d94a))
* Build bundled dist for b5ce5f0 ([14ff798](https://github.com/benhodgson87/conventional-pull-request-action/commit/14ff798e4d745c3e3e951f6ef472ff598b9c47a5))
* Check PR title and commit subject equality ([#13](https://github.com/benhodgson87/conventional-pull-request-action/issues/13)) ([2ece7b9](https://github.com/benhodgson87/conventional-pull-request-action/commit/2ece7b9853f4694626250e611203e474911f803d))
* Config object, add tests ([#5](https://github.com/benhodgson87/conventional-pull-request-action/issues/5)) ([1976843](https://github.com/benhodgson87/conventional-pull-request-action/commit/1976843e827f46e4799ff540e65acc2ce6a4fe61))
* Continue with standard rules when custom missing ([7af80a5](https://github.com/benhodgson87/conventional-pull-request-action/commit/7af80a5758c27329d8ec25433c92cf74e09a5afa))
* Fix core imports ([1e55299](https://github.com/benhodgson87/conventional-pull-request-action/commit/1e55299d8fc2d889513f32d3667b8f2a4a01becc))
* Fix github import ([ca99dbf](https://github.com/benhodgson87/conventional-pull-request-action/commit/ca99dbfcbd412fe407ba85687ac7706afb698335))
* Fix handling of missing rules config ([9e02bb0](https://github.com/benhodgson87/conventional-pull-request-action/commit/9e02bb09c0b3cba7a6e2c535f97f8a4759b8a17e))
* Improve warn messaging and add debug for workspace ([3201613](https://github.com/benhodgson87/conventional-pull-request-action/commit/3201613239fd53f257f7e4e32fd32b8e34e46786))
* Incorrect error message on scope type parser, throw instead of log ([b5ce5f0](https://github.com/benhodgson87/conventional-pull-request-action/commit/b5ce5f024a8ef783bb7dc5bc50c80e54a0e96aa9))
* Missing workspace has misleading error message ([#15](https://github.com/benhodgson87/conventional-pull-request-action/issues/15)) ([b337ad3](https://github.com/benhodgson87/conventional-pull-request-action/commit/b337ad39e38783837e4992f4d5de9f0f92e118a3))
* Remove unused files + fix docs ([10a5aae](https://github.com/benhodgson87/conventional-pull-request-action/commit/10a5aae0d4a8d053784c7c6b68f04795ccc9c397))
* Run build ([#4](https://github.com/benhodgson87/conventional-pull-request-action/issues/4)) ([4a1cbd4](https://github.com/benhodgson87/conventional-pull-request-action/commit/4a1cbd454d254d1c49a879b10655d56d2bf8179e))
* **security:** Bump opensource-check ([#9](https://github.com/benhodgson87/conventional-pull-request-action/issues/9)) ([d9f43de](https://github.com/benhodgson87/conventional-pull-request-action/commit/d9f43de92ad6d11d8b8a45ab55936db60e032c3a))
* Use config-conventional parserOpts ([#14](https://github.com/benhodgson87/conventional-pull-request-action/issues/14)) ([8194ce5](https://github.com/benhodgson87/conventional-pull-request-action/commit/8194ce551261c4cb3687da8213b35915571c25c1))

## [2.0.1](https://github.com/benhodgson87/conventional-pull-request-action/compare/v2.0.0...v2.0.1) (2026-06-15)


### Bug Fixes

* Await lint() to ensure errors are caught correctly ([#28](https://github.com/benhodgson87/conventional-pull-request-action/issues/28)) ([c7d49ab](https://github.com/benhodgson87/conventional-pull-request-action/commit/c7d49ab6c15c815e2cb2ae15235560e13c80d94a))


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

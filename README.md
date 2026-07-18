# Starweb Menus
Composable canvas menu screens for browser games, built with TypeScript.

[![CI](https://github.com/starweb-libs/menus/actions/workflows/ci.yml/badge.svg)](https://github.com/starweb-libs/menus/actions/workflows/ci.yml)
[![Library Version](https://img.shields.io/npm/v/@starweb-libs/menus)](https://www.npmjs.com/package/@starweb-libs/menus)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

## Tech Stack
<p align="left">
  <img height="35" src="https://img.shields.io/badge/TypeScript-%23007ACC?logo=typescript&logoColor=white&style=for-the-badge"/>
</p>

## Modules
| Module | Description |
| ------ | ----------- |
| `transition.js` | Plays the button sound, runs an optional callback, and flushes pointer + keyboard input between screens. |
| `title.js` | Title screen with START and SETTINGS buttons; takes a level count and an optional on-start callback. |
| `levels.js` | Level-select grid (up to 9) with a Back button; takes the level list and a `selectLevel(index)` callback. |
| `settings.js` | Settings screen with mute toggle and volume slider; takes the current slider state and returns the updated state alongside the frame. |
| `pause.js` | Pause overlay with Resume / Restart / Quit buttons; takes a `resetPlayState` callback. |
| `complete.js` | Level-complete overlay with Restart / Quit buttons, plus Next when a further level exists; takes the level index/count and `selectLevel` + `resetPlayState` callbacks. |
| `failed.js` | Level-failed overlay with Restart / Quit buttons; takes a `resetPlayState` callback. |

## Installation
```bash
npm install github:starweb-libs/menus
```

## License
MIT License - see [LICENSE](./LICENSE) for details.

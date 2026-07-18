import type { Audio    } from "@starweb-libs/audio/audio.js";
import { flushPointer  } from "@starweb-libs/engine/input/pointer.js";
import { flushKeyboard } from "@starweb-libs/engine/input/keyboard.js";

export function transition<T>(frame: T, audio: Audio, fn?: () => void): T {
  audio.playSound("button");
  fn?.();
  flushPointer();
  flushKeyboard();
  return frame;
}

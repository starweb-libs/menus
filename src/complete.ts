import type { Button                } from "@starweb-libs/ui/types.js";
import type { Audio                 } from "@starweb-libs/audio/audio.js";
import { getPointer                 } from "@starweb-libs/engine/input/pointer.js";
import { getLayout, drawTitle       } from "@starweb-libs/ui/layout.js";
import { getButtonState, drawButton } from "@starweb-libs/ui/button.js";
import type { CompleteAction, CompleteFrame, CompleteMenuState } from "./types.ts";
import { transition                                            } from "./transition.ts";

export function handleCompleteFrame(
  w: number, h: number, a: Audio,
  levelIndex: number,
  levelCount: number,
  selectLevel: (i: number) => void, resetPlayState: () => void,
): CompleteFrame {
  const { scale, gap, cx, cy, btnW, btnH } = getLayout(w, h);
  const hasNext = levelIndex < levelCount - 1
  const btnCount = hasNext ? 3 : 2;
  const totalH = btnH * btnCount + gap * (btnCount - 1);
  const firstY = cy - totalH / 2;
  const titleY = firstY - btnH * 0.5 - gap * 2;

  const restartBtn: Button = { x: cx - btnW/2, y: firstY,                                 w: btnW, h: btnH, label: "Restart" };
  const quitBtn:    Button = { x: cx - btnW/2, y: firstY + (btnH + gap) * (btnCount - 1), w: btnW, h: btnH, label: "Quit"    };

  const restart = { btn: restartBtn, state: getButtonState(restartBtn, getPointer()) };
  const quit    = { btn: quitBtn,    state: getButtonState(quitBtn,    getPointer()) };

  let next: CompleteMenuState["next"] = null;
  if (hasNext) {
    const nextBtn: Button = { x: cx - btnW/2, y: firstY + (btnH + gap), w: btnW, h: btnH, label: "Next" };
    next = { btn: nextBtn, state: getButtonState(nextBtn, getPointer()) };
  }

  let action: CompleteAction = null;
  if (next?.state.clicked)   action = "next";
  if (restart.state.clicked) action = "restart";
  if (quit.state.clicked)    action = "quit";

  const ui = { cx, scale, titleY, restart, next, quit, action };

  if (ui.action === "quit")    return transition({ game: "menu-title", ui: null }, a);
  if (ui.action === "next")    return transition(
    { game: "level-playing", ui: null },
    a,
    () => selectLevel(levelIndex + 1)
  );
  if (ui.action === "restart") return transition(
    { game: "level-playing", ui: null },
    a,
    () => resetPlayState()
  );
  return { game: "level-complete", ui };
}

export function renderCompleteFrame(
  ctx: CanvasRenderingContext2D,
  ui: CompleteMenuState | null,
  w: number, h: number,
): void {
  if (!ui) return;

  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, w, h);
  drawTitle(ctx, "Level Complete!", ui.cx, ui.titleY, ui.scale);
  drawButton(ctx, ui.restart.btn, ui.restart.state);
  if (ui.next) drawButton(ctx, ui.next.btn, ui.next.state);
  drawButton(ctx, ui.quit.btn, ui.quit.state);
}



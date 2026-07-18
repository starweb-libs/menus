import type { Button                } from "@starweb-libs/ui/types.js";
import type { Audio                 } from "@starweb-libs/audio/audio.js";
import { getPointer                 } from "@starweb-libs/engine/input/pointer.js";
import { getLayout, drawTitle       } from "@starweb-libs/ui/layout.js";
import { getButtonState, drawButton } from "@starweb-libs/ui/button.js";
import type { LevelSelectState, LevelsFrame } from "./types.ts";
import { transition                         } from "./transition.ts";

export function handleLevelFrame(
  w: number, h: number, a: Audio,
  levels: { name?: string }[],
  selectLevel: (i: number) => void,
): LevelsFrame {
  const { scale, gap, cx, cy, btnW, btnH } = getLayout(w, h);
  const titleY = scale * 0.15;

  const cols  = 3;
  const cellW = btnH * 3;
  const gridW = cellW * cols + gap * (cols - 1);
  const gridH = btnH * 3 + gap * 2;
  const gridX = cx - gridW / 2;
  const gridY = cy - gridH / 2;

  let clickedIndex: number | null = null;
  const levelEntries = Array.from({ length: Math.min(levels.length, 9) }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const btn: Button = {
      x: gridX + col * (cellW + gap),
      y: gridY + row * (btnH + gap),
      w: cellW, h: btnH,
      label: levels[i]?.name ?? `Level ${i + 1}`,
    };
    const state = getButtonState(btn, getPointer());
    if (state.clicked) clickedIndex = i;
    return { btn, state };
  });

  const backBtn: Button = { x: cx - btnW/2, y: h - btnH - gap*2, w: btnW, h: btnH, label: "Back" };
  const back = { btn: backBtn, state: getButtonState(backBtn, getPointer()) };

  const ui = { cx, scale, titleY, levels: levelEntries, back, clickedIndex };

  if (ui.back.state.clicked) return transition({ game: "menu-title", ui: null }, a);
  if (ui.clickedIndex !== null) {
    const index = ui.clickedIndex;
    return transition(
      { game: "level-playing", ui: null },
      a,
      () => selectLevel(index)
    );
  }
  return { game: "menu-levels", ui };
}

export function renderLevelFrame(
  ctx: CanvasRenderingContext2D,
  ui: LevelSelectState | null
): void {
  if (!ui) return;
  drawTitle(ctx, "Select Level", ui.cx, ui.titleY, ui.scale);
  for (const entry of ui.levels) drawButton(ctx, entry.btn, entry.state);
  drawButton(ctx, ui.back.btn, ui.back.state);
}

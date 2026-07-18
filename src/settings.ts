import type { Button, Slider, SliderState } from "@starweb-libs/ui/types.js";
import type { Audio                       } from "@starweb-libs/audio/audio.js";
import { getPointer                       } from "@starweb-libs/engine/input/pointer.js";
import { getLayout, drawTitle             } from "@starweb-libs/ui/layout.js";
import { getButtonState, drawButton       } from "@starweb-libs/ui/button.js";
import { updateSlider, drawSlider         } from "@starweb-libs/ui/slider.js";
import type { SettingsFrame, SettingsMenuState } from "./types.ts";
import { transition                            } from "./transition.ts";

export function handleSettingsFrame(
  w: number, h: number, volState: SliderState, a: Audio,
): { frame: SettingsFrame; volState: SliderState } {
  const { scale, gap, cx, cy, btnW, btnH } = getLayout(w, h);
  const titleY = scale * 0.15;

  const muteBtn:   Button = { x: cx - btnW/2, y: cy - btnH/2,       w: btnW, h: btnH, label: a.muted ? "Unmute" : "Mute" };
  const backBtn:   Button = { x: cx - btnW/2, y: h - btnH - gap*2,  w: btnW, h: btnH, label: "Back" };
  const volSlider: Slider = { x: cx - btnW/2, y: cy + btnH/2 + gap, w: btnW, h: btnH, label: "Volume" };

  const mute = { btn: muteBtn, state: getButtonState(muteBtn, getPointer()) };
  const back = { btn: backBtn, state: getButtonState(backBtn, getPointer()) };

  if (mute.state.clicked) a.setMuted(!a.muted);
  volState = updateSlider(volSlider, volState, getPointer());
  a.setVolume(volState.value);

  const ui = { cx, scale, titleY, mute, back, vol: { slider: volSlider, state: volState }, muted: a.muted };
  const frame: SettingsFrame = ui.back.state.clicked
    ? transition({ game: "menu-title", ui: null }, a)
    : { game: "menu-settings", ui };
  return { frame, volState };
}

export function renderSettingsFrame(
  ctx: CanvasRenderingContext2D,
  ui: SettingsMenuState | null
): void {
  if (!ui) return;
  drawTitle(ctx, "Settings", ui.cx, ui.titleY, ui.scale);
  drawButton(ctx, ui.mute.btn,   ui.mute.state);
  drawSlider(ctx, ui.vol.slider, ui.vol.state.value);
  drawButton(ctx, ui.back.btn,   ui.back.state);
}

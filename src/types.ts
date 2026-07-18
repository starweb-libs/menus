import type {
  MenuLayout,
  ButtonEntry,
  SliderEntry
} from "@starweb-libs/ui/types.js";

export interface TitleMenuState extends MenuLayout {
  start:    ButtonEntry;
  settings: ButtonEntry;
}
export type TitleFrame = { game: "menu-levels";   ui: null }
                       | { game: "level-playing"; ui: null }
                       | { game: "menu-settings"; ui: null }
                       | { game: "menu-title";    ui: TitleMenuState };

export type SettingsFrame = { game: "menu-title";    ui: null }
                          | { game: "menu-settings"; ui: SettingsMenuState };
export interface SettingsMenuState extends MenuLayout {
  mute:  ButtonEntry;
  back:  ButtonEntry;
  vol:   SliderEntry;
  muted: boolean;
}

export type LevelsFrame = { game: "menu-title";    ui: null }
                        | { game: "level-playing"; ui: null }
                        | { game: "menu-levels";   ui: LevelSelectState };
export interface LevelSelectState extends MenuLayout {
  levels:       ButtonEntry[];
  back:         ButtonEntry;
  clickedIndex: number | null;
}

export type PauseFrame = { game: "level-playing"; ui: null }
                       | { game: "menu-title";    ui: null }
                       | { game: "level-paused";  ui: PauseMenuState };
export type PauseAction    = "resume" | "restart" | "quit" | null;
export interface PauseMenuState extends MenuLayout {
  resume:  ButtonEntry;
  restart: ButtonEntry;
  quit:    ButtonEntry;
  action:  PauseAction;
}

export type FailedFrame = { game: "menu-title";    ui: null }
                        | { game: "level-playing"; ui: null }
                        | { game: "level-failed";  ui: FailedMenuState };
export type FailedAction   =            "restart" | "quit" | null;
export interface FailedMenuState extends MenuLayout {
  restart: ButtonEntry;
  quit:    ButtonEntry;
  action:  FailedAction;
}

export type CompleteFrame = { game: "menu-title";     ui: null }
                          | { game: "level-playing";  ui: null }
                          | { game: "level-complete"; ui: CompleteMenuState };
export type CompleteAction = "next"   | "restart" | "quit" | null;
export interface CompleteMenuState extends MenuLayout {
  restart: ButtonEntry;
  next:    ButtonEntry | null;
  quit:    ButtonEntry;
  action:  CompleteAction;
}

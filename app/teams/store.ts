import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";
import * as O from "optics-ts";
import type { RefObject } from "react";
import type { TeamPreset } from "./types";

export const teamListAtom = atomWithStorage<TeamPreset[]>("teamListAtom", []);

export const defaultTeamPreset: TeamPreset = {
  name: "",
  teamSize: 4,
  slots: [],
};

export const teamListSplittedAtom = splitAtom(teamListAtom);

export const teamPresetDollOptic = (index: number) =>
  O.optic_<TeamPreset>().prop("slots").index(index);

export const cardRefAtom = atom<RefObject<HTMLDivElement | null> | undefined>(
  undefined,
);

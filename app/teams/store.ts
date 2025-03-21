import { atom } from "jotai";
import { TeamPreset } from "./types";
import { atomWithStorage, splitAtom } from "jotai/utils";
import * as O from "optics-ts";
import { RefObject } from "react";

export const teamListAtom = atomWithStorage<TeamPreset[]>("teamListAtom", []);

export const teamListSplittedAtom = splitAtom(teamListAtom);

export const teamPresetDollOptic = (index: number) =>
  O.optic_<TeamPreset>().prop("slots").index(index);

export const cardRefAtom = atom<RefObject<HTMLDivElement | null> | undefined>(
  undefined,
);

import { TeamPreset } from "./types";
import { atomWithStorage, splitAtom } from "jotai/utils";
import * as O from "optics-ts";

export const teamListAtom = atomWithStorage<TeamPreset[]>("teamListAtom", []);

export const teamListSplittedAtom = splitAtom(teamListAtom);

export const teamPresetDollOptic = (index: number) =>
  O.optic_<TeamPreset>().prop("slots").index(index);

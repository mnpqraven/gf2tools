import { DollSlugEnum } from "@/repository/enums";

export type TeamPreset = {
  name: string;
  slots: (DollSlugEnum | undefined)[];
};

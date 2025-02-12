import { z } from "zod";

export const CALC_TYPE_ENUM = z.enum(["CHAR", "WEP"]);

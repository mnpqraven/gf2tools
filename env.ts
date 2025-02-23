import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const _zBool = z
  .string()
  // transform to boolean using preferred coercion logic
  .transform((s) => s !== "false" && s !== "0");

export const env = createEnv({
  server: {
    BACKEND_API_URL: z.string().url(),
    BUILD_KIND: z.enum(["DEV", "PROD"]).default("DEV"),
  },
  client: {},
  experimental__runtimeEnv: {},
});

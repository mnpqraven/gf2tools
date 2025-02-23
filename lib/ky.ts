import { env } from "@/env";
import _ky, { Input, KyInstance, Options } from "ky";
import { TRPCError } from "@trpc/server";
import { getStatusKeyFromCode } from "@trpc/server/unstable-core-do-not-import";

export const baseUrl = env.BACKEND_API_URL;

const options: Options = {
  prefixUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    afterResponse: [
      (_request, _options, response) => {
        console.error("[API] Error", response.status);
        if (response.status > 400)
          throw new TRPCError({ code: getStatusKeyFromCode(response.status) });
      },
    ],
  },
};

const kyInstance = _ky.create(options);

const apiFactory = (instance: KyInstance) => {
  const s = sanitizeUrl;
  return {
    get: <T>(url: Input, config?: Options) =>
      instance.get<T>(s(url), config).json(),
    post: <T, B = unknown>(url: string, body?: B, config?: Options) =>
      instance.post<T>(s(url), { ...config, json: body }).json(),
  };
};

// TODO: extend to accept object for search params
function sanitizeUrl(url: Input): Input {
  const beginSlash = url.toString().charAt(0) === "/";
  if (beginSlash) return url.toString().slice(1);
  return url;
}

const ky = apiFactory(kyInstance);
export { ky };

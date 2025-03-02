import { useMediaQuery } from "./useMediaQuery";

export const useIsDesktop = (query = "(min-width: 768px)") =>
  useMediaQuery(query);

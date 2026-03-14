export const useResolvedConfig = () => {
  const config = useRuntimeConfig();
  return {
    staticHost:
      config.public.staticHost === "remote"
        ? ""
        : config.public.staticHost ||
          config.public.publicApiBase ||
          config.apiBase,
  };
};

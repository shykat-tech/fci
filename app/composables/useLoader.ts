export const useLoader = () => {
  return useState<boolean>("site-loading", () => true);
};

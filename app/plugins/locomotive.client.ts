import LocomotiveScroll from "locomotive-scroll";

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return;
  let locomotiveScroll: LocomotiveScroll | null = null;

  nuxtApp.hook("page:start", () => {
    locomotiveScroll?.destroy();
  });

  nuxtApp.hook("page:finish", () => {
    locomotiveScroll = new LocomotiveScroll();
  });

  return {
    provide: {
      locomotiveScroll,
    },
  };
});

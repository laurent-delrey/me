let hasRegisteredFancyComponents = false;

export async function registerFancyComponents(): Promise<void> {
  if (hasRegisteredFancyComponents) return;
  if (typeof window === "undefined" || typeof (window as any).customElements === "undefined") return;

  try {
    const mod = await import("fancy-components");

    const constructors: Array<new () => any> = [
      mod.FcArrowBtn,
      mod.FcTypingInput,
      mod.FcBubbles,
      mod.Fc3DBtn,
      mod.FcParenthesesBtn,
      mod.FcDblWarpBtn,
      mod.FcPixelBtn,
      mod.FcRoundBtn,
      mod.FcUnderlineBtn,
      mod.FcWarpBtn,
      mod.FcChina,
      mod.FcWaveFilter,
    ].filter(Boolean);

    for (const Ctor of constructors) {
      try {
        // Instantiating each class registers its custom element once.
        new Ctor();
      } catch {
        // Ignore errors from duplicate registrations or constructor internals.
      }
    }

    hasRegisteredFancyComponents = true;
  } catch {
    // Swallow errors to avoid breaking the app if the package can't load client-side.
  }
}

// Art direction for every hero. These are decorative, imagined sky studies.
export const cosmicScenes = {
  home: {
    label: "Deep field / 01",
    angle: -8,
    position: "64% 46%",
    motif: "orbit",
  },
  work: {
    label: "Connected stars / 02",
    angle: 6,
    position: "70% 40%",
    motif: "constellation",
  },
  about: {
    label: "Beyond the horizon / 03",
    angle: -16,
    position: "76% 48%",
    motif: "eclipse",
  },
  services: {
    label: "Galactic bridge / 04",
    angle: 12,
    position: "62% 42%",
    motif: "constellation",
  },
  lab: {
    label: "Event horizon / 05",
    angle: -4,
    position: "68% 55%",
    motif: "orbit",
  },
  contact: {
    label: "Incoming signal / 06",
    angle: 20,
    position: "80% 36%",
    motif: "signal",
  },
  case: {
    label: "Mission archive",
    angle: 4,
    position: "72% 38%",
    motif: "constellation",
  },
  resume: {
    label: "Flight record / 07",
    angle: -12,
    position: "82% 42%",
    motif: "eclipse",
  },
  privacy: {
    label: "Quiet space / 08",
    angle: 8,
    position: "74% 50%",
    motif: "signal",
  },
  lost: {
    label: "Uncharted space / 404",
    angle: -22,
    position: "66% 38%",
    motif: "orbit",
  },
} as const;

export type CosmicScene = keyof typeof cosmicScenes;

export const cosmicArt = {
  desktop: "/media/cosmos/milky-way.webp",
  mobile: "/media/cosmos/milky-way-mobile.webp",
};

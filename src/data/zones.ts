import type { Zone } from '@/types/ocean'

export const zones: Zone[] = [
  {
    id: 'sunlight',
    name: 'Sunlight Zone',
    scientificName: 'Epipelagic',
    depth: { from: 0, to: 200 },
    intro:
      'Sunlight still reaches this layer, so phytoplankton can photosynthesize. This thin, bright band is the ocean most of us know.',
    facts: [
      'Water absorbs light fast: only about 1% of surface sunlight is left at 200 m.',
      'Sea turtles breathe air, yet a resting turtle can stay underwater for several hours.',
      'Fish swim in schools so that hundreds of bodies move as one, making it hard for a predator to single out a target.',
    ],
    dark: false,
    backgroundClass: 'bg-linear-to-b from-ocean-surface to-ocean-sunlight',
    creatures: [
      { id: 'turtle', kind: 'sea-turtle', label: 'A green sea turtle gliding through bright water', top: 38, left: 20, width: 'clamp(9rem, 24vw, 21rem)', parallax: 0.6, swim: 'right' },
      { id: 'school-1', kind: 'fish', label: 'A school of silver fish', top: 52, left: 58, width: 'clamp(3.5rem, 7.5vw, 6.5rem)', parallax: 1.2, swim: 'left' },
      { id: 'school-2', kind: 'fish', top: 57, left: 70, width: 'clamp(3rem, 6.5vw, 5.5rem)', parallax: 1.1, swim: 'left' },
      { id: 'school-3', kind: 'fish', top: 49, left: 78, width: 'clamp(2.5rem, 6vw, 5rem)', parallax: 1.3, swim: 'left' },
      { id: 'school-4', kind: 'fish', top: 62, left: 62, width: 'clamp(2.5rem, 6vw, 5rem)', parallax: 1.15, swim: 'left' },
      { id: 'school-5', kind: 'fish', top: 54, left: 86, width: 'clamp(3rem, 6.5vw, 5.5rem)', parallax: 1.25, swim: 'left' },
      { id: 'school-6', kind: 'fish', top: 64, left: 80, width: 'clamp(2.5rem, 5vw, 4.5rem)', parallax: 1.05, swim: 'left', desktopOnly: true },
      { id: 'school-7', kind: 'fish', top: 47, left: 66, width: 'clamp(2.5rem, 5vw, 4.5rem)', parallax: 1.35, swim: 'left', desktopOnly: true },
      { id: 'school-8', kind: 'fish', top: 60, left: 92, width: 'clamp(2.5rem, 5vw, 4.5rem)', parallax: 1.2, swim: 'left', desktopOnly: true },
      { id: 'school-9', kind: 'fish', top: 67, left: 71, width: 'clamp(2rem, 4vw, 4rem)', parallax: 1.1, swim: 'left', desktopOnly: true },
      { id: 'manta-ray', kind: 'manta-ray', label: 'A giant manta ray soaring on wide wing-like fins', top: 72, left: 50, width: 'clamp(9rem, 24vw, 21rem)', parallax: 0.8, swim: 'right' },
      { id: 'hammerhead', kind: 'hammerhead-shark', label: 'A hammerhead shark cruising with its wide, flat head', top: 78, left: 14, width: 'clamp(10rem, 28vw, 24rem)', parallax: 0.7, swim: 'right' },
    ],
  },
  {
    id: 'twilight',
    name: 'Twilight Zone',
    scientificName: 'Mesopelagic',
    depth: { from: 200, to: 1000 },
    intro:
      'Light fades to a faint blue glow, far too dim for photosynthesis. Here, many animals make their own light.',
    facts: [
      'Every night, trillions of animals rise from this zone to feed near the surface, then sink again at dawn: the largest migration on Earth.',
      'In 17 years of deep-sea video off California, 76% of the animals observed in the water column could produce light.',
    ],
    dark: false,
    backgroundClass: 'bg-linear-to-b from-ocean-sunlight to-ocean-twilight',
    creatures: [
      { id: 'swordfish', kind: 'swordfish', label: 'A swordfish with a long, flat bill', top: 16, left: 18, width: 'clamp(10rem, 28vw, 24rem)', parallax: 0.9, swim: 'right' },
      { id: 'lanternfish-1', kind: 'lanternfish', label: 'Lanternfish with rows of glowing light organs along their bellies', top: 40, left: 26, width: 'clamp(4.5rem, 9vw, 8rem)', parallax: 1.1, swim: 'right' },
      { id: 'lanternfish-2', kind: 'lanternfish', top: 46, left: 16, width: 'clamp(4rem, 8vw, 7rem)', parallax: 1.2, swim: 'right' },
      { id: 'lanternfish-3', kind: 'lanternfish', top: 52, left: 30, width: 'clamp(3.5rem, 7vw, 6rem)', parallax: 1.05, swim: 'right', desktopOnly: true },
      { id: 'jellyfish', kind: 'jellyfish', label: 'A pink jellyfish trailing long tentacles', top: 50, left: 60, width: 'clamp(7rem, 17vw, 14rem)', parallax: 0.7, swim: 'up' },
      { id: 'squid', kind: 'squid', label: 'A red squid jetting through the water', top: 70, left: 18, width: 'clamp(9rem, 22vw, 19rem)', parallax: 1.1, swim: 'left' },
      { id: 'hatchetfish-1', kind: 'hatchetfish', label: 'Deep-bodied hatchetfish with glowing spots on their bellies', top: 80, left: 60, width: 'clamp(4.5rem, 9vw, 8rem)', parallax: 1, swim: 'left' },
      { id: 'hatchetfish-2', kind: 'hatchetfish', top: 86, left: 76, width: 'clamp(4rem, 8vw, 7rem)', parallax: 1.15, swim: 'left' },
    ],
  },
  {
    id: 'midnight',
    name: 'Midnight Zone',
    scientificName: 'Bathypelagic',
    depth: { from: 1000, to: 4000 },
    intro:
      'No sunlight ever reaches this far. The only light comes from living things, and the water is just a few degrees above freezing.',
    facts: [
      'A female anglerfish dangles a lure that glows thanks to bacteria living inside it.',
      "The gulper eel's loosely hinged jaw is enormous for its body, and the tip of its tail carries a small pinkish light organ.",
      'The water pressure here is 100 to 400 times what you feel at the surface.',
    ],
    dark: true,
    backgroundClass: 'bg-linear-to-b from-ocean-twilight to-ocean-midnight',
    creatures: [
      { id: 'anglerfish', kind: 'anglerfish', label: 'An anglerfish with a glowing lure and needle-like teeth', top: 50, left: 54, width: 'clamp(10rem, 26vw, 22rem)', parallax: 0.75, swim: 'left' },
      { id: 'gulper-eel', kind: 'gulper-eel', label: 'A gulper eel with a huge open mouth and a glowing tail tip', top: 72, left: 4, width: 'clamp(11rem, 30vw, 26rem)', parallax: 1.05, swim: 'right' },
    ],
  },
  {
    id: 'abyssal',
    name: 'Abyssal Zone',
    scientificName: 'Abyssopelagic',
    depth: { from: 4000, to: 6000 },
    intro:
      'Near-freezing water, crushing pressure and total darkness blanket the wide, flat abyssal plains.',
    facts: [
      'The water here stays just above freezing, and the pressure tops 400 atmospheres.',
      'Giant isopods, deep-sea relatives of the pill bug, scavenge the seafloor and can reach about 45 cm (18 in) long.',
    ],
    dark: true,
    backgroundClass: 'bg-linear-to-b from-ocean-midnight to-ocean-abyssal',
    creatures: [
      { id: 'isopod', kind: 'giant-isopod', label: 'A giant isopod crawling across the seafloor', top: 62, left: 30, width: 'clamp(12rem, 34vw, 30rem)', parallax: 0.8, swim: 'right' },
    ],
  },
  {
    id: 'hadal',
    name: 'Hadal Zone',
    scientificName: 'Hadalpelagic',
    depth: { from: 6000, to: 10935 },
    intro:
      'Named after Hades, the Greek underworld, this zone exists only inside the deep trenches that scar the ocean floor.',
    facts: [
      'The deepest fish ever filmed was a snailfish, recorded at 8,336 m in the Izu-Ogasawara Trench.',
      'Hadal snailfish have soft, gelatinous bodies, and much of their skeleton is flexible cartilage rather than bone.',
      'At the bottom, more than 1,000 atmospheres press on every surface: about 16,000 psi.',
    ],
    dark: true,
    backgroundClass: 'bg-linear-to-b from-ocean-abyssal to-ocean-hadal',
    creatures: [
      { id: 'snailfish', kind: 'snailfish', label: 'A pale pink hadal snailfish', top: 62, left: 26, width: 'clamp(10rem, 28vw, 24rem)', parallax: 0.7, swim: 'left' },
    ],
  },
]

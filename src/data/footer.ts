import type { Source } from '@/types/ocean'

export const footer = {
  sourcesTitle: 'Sources',
  creditsTitle: 'Credits',
  credits: [
    'Illustrations traced to SVG from original flat artwork.',
    'Built with React, GSAP and Tailwind CSS.',
    'Temperatures shown by the instruments follow a typical western Pacific profile and are approximate.',
  ],
  closing: 'Abyss is an educational project. No ads, no sign-ups, just the ocean.',
}

export const sources: Source[] = [
  { label: 'How deep is the ocean?', publisher: 'NOAA Ocean Service', url: 'https://oceanservice.noaa.gov/facts/oceandepth.html' },
  { label: 'How does pressure change with ocean depth?', publisher: 'NOAA Ocean Service', url: 'https://oceanservice.noaa.gov/facts/pressure.html' },
  { label: 'Ocean zones', publisher: 'Woods Hole Oceanographic Institution', url: 'https://www.whoi.edu/know-your-ocean/ocean-topics/how-the-ocean-works/ocean-zones/' },
  { label: 'Greatest migration on Earth happens under darkness every day', publisher: 'WHOI Ocean Twilight Zone', url: 'https://twilightzone.whoi.edu/greatest-migration-on-earth-happens-under-darkness-every-day' },
  { label: 'Pervasiveness of bioluminescence in the deep sea (Martini & Haddock, 2017)', publisher: 'Scientific Reports / MBARI', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5379559/' },
  { label: 'Pelican eel, Eurypharynx pelecanoides', publisher: 'Fishes of Australia', url: 'https://fishesofaustralia.net.au/home/species/3300' },
  { label: 'Black smokers and hydrothermal vents', publisher: 'NOAA Ocean Exploration', url: 'https://oceanexplorer.noaa.gov/?p=16069' },
  { label: 'Behold the deepest fish ever filmed', publisher: 'Smithsonian Magazine', url: 'https://www.smithsonianmag.com/smart-news/behold-the-deepest-fish-ever-filmed-180981937/' },
  { label: 'How long can sea turtles hold their breath?', publisher: 'State of the World’s Sea Turtles', url: 'https://seaturtlestatus.org/articles/2024/2/14/faq-how-long-can-sea-turtles-hold-their-breath' },
  { label: 'How accurately can we measure Earth’s deepest point? (2026 survey)', publisher: 'Astrobiology / Scientific Data', url: 'https://astrobiology.com/2026/09/18/water-planet-recon-how-accurately-can-we-measure-earth-oceans-deepest-point/' },
]

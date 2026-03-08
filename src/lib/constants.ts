export const SITE_CONFIG = {
  name: 'April Garnica',
  title: 'Filmmaker / Director of Photography / Visual Artist',
  description:
    'Portfolio of April Garnica — filmmaker, photographer, and visual artist from Tijuana, Mexico, studying film at UC Santa Cruz.',
  url: 'https://aprilgarnica.com',
  email: 'contact@aprilgarnica.com',
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/aprilgarnica',
  vimeo: 'https://vimeo.com/aprilgarnica',
} as const;

export const NAV_LINKS = [
  { label: 'Film', href: '/film' },
  { label: 'Photography', href: '/photography' },
  { label: 'Animation', href: '/animation' },
  { label: 'Art', href: '/art' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
] as const;

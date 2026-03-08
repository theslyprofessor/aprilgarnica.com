import { type CollectionEntry, getCollection } from 'astro:content';

export async function getAllFilms(): Promise<CollectionEntry<'films'>[]> {
  return (await getCollection('films')).sort(
    (a, b) => a.data.sortOrder - b.data.sortOrder,
  );
}

export async function getFeaturedFilms(): Promise<CollectionEntry<'films'>[]> {
  return (await getCollection('films', ({ data }) => data.featured)).sort(
    (a, b) => a.data.sortOrder - b.data.sortOrder,
  );
}

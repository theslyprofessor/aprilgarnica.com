import { type CollectionEntry, getCollection } from 'astro:content';

export async function getAllBlogPosts(): Promise<CollectionEntry<'blog'>[]> {
  return (
    await getCollection('blog', ({ data }) => {
      return import.meta.env.PROD ? !data.draft : true;
    })
  ).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
  return posts.flatMap((post) => [...post.data.tags]);
}

export function getUniqueTags(posts: CollectionEntry<'blog'>[]) {
  return [...new Set(getAllTags(posts))];
}

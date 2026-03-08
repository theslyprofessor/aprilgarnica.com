import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

function removeDupsAndLowerCase(array: string[]) {
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),
      description: z.string(),
      coverImage: z
        .object({
          alt: z.string(),
          src: image(),
        })
        .optional(),
      draft: z.boolean().default(false),
      ogImage: z.string().optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
    }),
});

const films = defineCollection({
  loader: glob({ base: './src/content/films', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      role: z.string(),
      logline: z.string(),
      synopsis: z.string().optional(),
      vimeoId: z.string().optional(),
      trailerVimeoId: z.string().optional(),
      posterImage: image().optional(),
      runtime: z.string().optional(),
      festivals: z
        .array(
          z.object({
            name: z.string(),
            year: z.number(),
            result: z
              .enum(['official_selection', 'nominated', 'winner', 'screening'])
              .optional(),
            award: z.string().optional(),
          }),
        )
        .default([]),
      credits: z
        .array(
          z.object({
            role: z.string(),
            name: z.string(),
          }),
        )
        .default([]),
      featured: z.boolean().default(false),
      sortOrder: z.number().default(0),
    }),
});

export const collections = { blog, films };

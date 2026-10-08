import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Category = Project['data']['category'];

const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;

/** All published projects, sorted by `order`. */
export async function getProjects(category?: Category): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.filter((p) => !category || p.data.category === category).sort(byOrder);
}

/** Projects that have their own page (no externalUrl). */
export async function getProjectPages(category: Category): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => data.category === category && !data.draft);
  return all.filter((p) => !p.data.externalUrl && !p.data.listOnly);
}

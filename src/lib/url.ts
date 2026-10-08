import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

/** Prefix an internal path with the configured base (e.g. "/old-portfolio"). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}

/** URL prefix per category, matching the old Webflow URLs. */
export const categoryPath: Record<Project['data']['category'], string> = {
  professional: 'main-work',
  'case-study': 'projects',
  playground: 'experiments',
};

/** Where a project card should link: its own page, an external URL, or nowhere. */
export function projectHref(project: Project): string | undefined {
  if (project.data.externalUrl) return project.data.externalUrl;
  if (project.data.listOnly) return undefined;
  return href(`${categoryPath[project.data.category]}/${project.id}`);
}

export function isExternal(url: string | undefined): boolean {
  return !!url && /^https?:/.test(url);
}

export type LocalProject = {
  id: string;
  name: string;
  userId?: string | null;
  json: string;
  width: number;
  height: number;
  thumbnailUrl?: string | null;
  isTemplate?: boolean | null;
  isPro?: boolean | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

const STORAGE_KEY = "projects";

const getNowISO = () => new Date().toISOString();

function loadAll(): LocalProject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as LocalProject[];
    return [];
  } catch {
    return [];
  }
}

function saveAll(projects: LocalProject[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function list(page: number, limit: number): { data: LocalProject[]; nextPage: number | null } {
  const all = loadAll().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  const start = (page - 1) * limit;
  const end = start + limit;
  const slice = all.slice(start, end);
  const nextPage = end < all.length ? page + 1 : null;
  return { data: slice, nextPage };
}

export function getById(id: string): LocalProject | null {
  const all = loadAll();
  return all.find(p => p.id === id) || null;
}

export function create(values: Pick<LocalProject, "name" | "json" | "width" | "height">): LocalProject {
  const all = loadAll();
  const proj: LocalProject = {
    id: crypto.randomUUID(),
    name: values.name,
    json: values.json,
    width: values.width,
    height: values.height,
    thumbnailUrl: null,
    isTemplate: false,
    isPro: false,
    createdAt: getNowISO(),
    updatedAt: getNowISO(),
    userId: null,
  };
  all.unshift(proj);
  saveAll(all);
  return proj;
}

export function update(id: string, patch: Partial<Pick<LocalProject, "name" | "json" | "width" | "height" | "thumbnailUrl">>): LocalProject | null {
  const all = loadAll();
  const idx = all.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const updated: LocalProject = {
    ...all[idx],
    ...patch,
    updatedAt: getNowISO(),
  };
  all[idx] = updated;
  saveAll(all);
  return updated;
}

export function remove(id: string): { id: string } | null {
  const all = loadAll();
  const remaining = all.filter(p => p.id !== id);
  if (remaining.length === all.length) return null;
  saveAll(remaining);
  return { id };
}

export function duplicate(id: string): LocalProject | null {
  const all = loadAll();
  const original = all.find(p => p.id === id);
  if (!original) return null;
  const copy: LocalProject = {
    ...original,
    id: crypto.randomUUID(),
    name: `Copy of ${original.name}`,
    createdAt: getNowISO(),
    updatedAt: getNowISO(),
  };
  all.unshift(copy);
  saveAll(all);
  return copy;
}

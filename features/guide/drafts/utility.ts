export function getDraftKey(entity: string, id?: string | number) {
  if (typeof window === 'undefined') return '';
  
  if (id) return `${entity}:${id}`;

  const storageKey = `${entity}:draft:new`;
  const existing = sessionStorage.getItem(storageKey);
  if (existing) return existing;

  const newKey = `${entity}:NEW:${crypto.randomUUID()}`;
  sessionStorage.setItem(storageKey, newKey);
  return newKey;
}
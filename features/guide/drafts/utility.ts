export function getDraftKey(
  entity: string, 
  id?: string | number, 
  options?: { newGuide?: boolean }
) {
  if (typeof window === 'undefined') return '';
  
  if (id) return `${entity}:${id}`;

  const storageKey = `${entity}:draft:current`;
  
  // If newGuide is true, always generate a new key
  if (options?.newGuide) {
    const newKey = `${entity}:DRAFT:${crypto.randomUUID()}`;
    sessionStorage.setItem(storageKey, newKey);
    return newKey;
  }
  
  // Otherwise, check for existing key in sessionStorage
  const existing = sessionStorage.getItem(storageKey);
  if (existing) return existing;

  // Generate new key if none exists
  const newKey = `${entity}:DRAFT:${crypto.randomUUID()}`;
  sessionStorage.setItem(storageKey, newKey);
  return newKey;
}

export function createNewDraftKey(entity: string) {
  if (typeof window === 'undefined') return null;

  const storageKey = `${entity}:draft:current`;
  const newKey = `${entity}:DRAFT:${crypto.randomUUID()}`;

  sessionStorage.setItem(storageKey, newKey);
  return newKey;
}


export function getExistingDraftKey(entity: string) {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(`${entity}:draft:current`);
}

export function handleCreateGuide(router: any) {
  const draftKey = createNewDraftKey('GUIDE');
  router.push(`/create-guide?draftKey=${draftKey}`);
};

export function handleCreateGuideDraft(router: any, draftKey: string) {
  router.push(`/create-guide?draftKey=${draftKey}`);
};


/**
 * Shared API client: single place for fetch behavior and error handling.
 *
 * Project standard for all domain API classes:
 * - Use API_BASE_URL (app backend) or BIBLE_BASE_URL (bible service).
 * - Use fetchJson<T>(url, options) for all requests; it throws on !ok with status + body.
 * - Use skipJson: true for void-returning methods (e.g. DELETE, or POST that returns 204).
 * - No console.log in API classes; keep them pure.
 * - Explicit Promise<T> return types; private static readonly BASE_URL per class.
 *
 * Why this is better:
 * - Consistent error messages (status + response body) for debugging.
 * - One place to add auth headers, retries, or base URL from env later.
 * - Same behavior and naming across guide-draft, guide, journeys, and bible.
 */

export const API_BASE_URL = "http://localhost:3002/api/v1";

/** Bible/translations service (different port). */
export const BIBLE_BASE_URL = "http://localhost:3000";

export type FetchJsonOptions = RequestInit & {
  /** When true, do not parse response as JSON (for 204/empty body). */
  skipJson?: boolean;
};

/**
 * Fetches and parses JSON. Throws on !response.ok with status and body text.
 */
export async function fetchJson<T = unknown>(
  url: string,
  options: FetchJsonOptions = {}
): Promise<T> {
  const { skipJson = false, ...init } = options;
  const response = await fetch(url, init);

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Request failed (${response.status}): ${errorBody || response.statusText}`
    );
  }

  if (skipJson) return undefined as T;
  return response.json();
}

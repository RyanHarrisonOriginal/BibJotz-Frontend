import { API_BASE_URL, fetchJson } from "@/lib/api";

export type SaveReflectionPayload = {
  entry_key: string;
  journey_id: string;
  guide_section_id: string;
  content: string;
  author_id: number;
};

/** Response shape when the backend returns the saved reflection. */
export type SaveReflectionResponse = unknown;

export class ReflectionApiService {
  private static readonly BASE_URL = API_BASE_URL;

  /**
   * Creates a new reflection. Use upsertReflection for debounced save (idempotent).
   */
  static async saveReflection(
    payload: SaveReflectionPayload
  ): Promise<SaveReflectionResponse> {
    return fetchJson<SaveReflectionResponse>(
      `${this.BASE_URL}/reflections`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
  }

  /**
   * Upserts a reflection by journey_id + guide_section_id + author_id (idempotent).
   * PUT /reflections — create if missing, update if exists. Use for debounced save.
   */
  static async upsertReflection(
    payload: SaveReflectionPayload
  ): Promise<SaveReflectionResponse> {
    return fetchJson<SaveReflectionResponse>(
      `${this.BASE_URL}/reflections`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
  }
}

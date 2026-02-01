import { API_BASE_URL, fetchJson } from "@/lib/api";
import { Guide } from "@/domain/guide/types";
import { Draft } from "../types";

export class DraftApiService {
  private static readonly BASE_URL = API_BASE_URL;

  static async saveDraft(
    userId: number,
    draftContent: Guide,
    draftKey: string
  ): Promise<Draft> {
    return fetchJson<Draft>(`${this.BASE_URL}/drafts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        draftContent,
        draftKey,
        name: draftContent.name,
      }),
    });
  }

  static async getDraft(draftKey: string): Promise<Draft> {
    return fetchJson<Draft>(
      `${this.BASE_URL}/drafts/${encodeURIComponent(draftKey)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      }
    );
  }

  static async publishDraft(draftKey: string): Promise<void> {
    await fetchJson(
      `${this.BASE_URL}/drafts/${encodeURIComponent(draftKey)}/publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        skipJson: true,
      }
    );
  }

  static async getUserDrafts(userId: number): Promise<Partial<Draft>[]> {
    return fetchJson<Partial<Draft>[]>(`${this.BASE_URL}/drafts/user/${userId}`, {
      method: "GET",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });
  }
}

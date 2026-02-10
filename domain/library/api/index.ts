import { API_BASE_URL, fetchJson } from "@/lib/api";
import type { JourneyDetail, LibraryJourney } from "../types";
import { toJourneyArray, type LibraryResponse } from "../utils/mappers";

export class LibraryApiService {
  private static readonly BASE_URL = API_BASE_URL;

  /**
   * Returns the user's library (journeys with reflections).
   */
  static async getLibraryJourneys(): Promise<LibraryJourney[]> {
    const response = await fetchJson<LibraryResponse>(
      `${this.BASE_URL}/journeys/library`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return toJourneyArray(response);
  }

  /**
   * Returns a single journey with sections and reflections (for the reflection editor).
   * Mocked until backend implements GET /journeys/:id or similar.
   */
  static async getJourneyDetail(journeyId: string): Promise<JourneyDetail> {
    // TODO: replace with real endpoint when available, e.g. GET /journeys/:journeyId
    // const response = await fetchJson<JourneyDetail>(`${this.BASE_URL}/journeys/${journeyId}`, { method: "GET", ... });
    const list = await this.getLibraryJourneys();
    const found = list.find((j) => j.id === journeyId);
    if (found) return found;
    return Promise.reject(new Error(`Journey not found: ${journeyId}`));
  }
}

import { API_BASE_URL, fetchJson } from "@/lib/api";
import { CreateJourneyPayload, Journey } from "../types";

export class JourneyApiService {
  private static readonly BASE_URL = API_BASE_URL;

  static async createJourney(
    payload: CreateJourneyPayload
  ): Promise<Journey> {
    return fetchJson<Journey>(`${this.BASE_URL}/journeys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
}

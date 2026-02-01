import { API_BASE_URL, fetchJson } from "@/lib/api";
import {
  Guide,
  GuideListPayload,
  GuideOptionsListPayload,
} from "../types";

export class GuideApiService {
  private static readonly BASE_URL = API_BASE_URL;

  static async publishGuide(guide: Guide): Promise<void> {
    await fetchJson(`${this.BASE_URL}/guides`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guide),
      skipJson: true,
    });
  }

  static async getGuides(): Promise<GuideListPayload> {
    return fetchJson<GuideListPayload>(`${this.BASE_URL}/guides`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }

  static async getGuideOptions(): Promise<GuideOptionsListPayload> {
    return fetchJson<GuideOptionsListPayload>(`${this.BASE_URL}/guides/options`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }

  static async deleteGuide(guideId: number): Promise<void> {
    await fetchJson(`${this.BASE_URL}/guides/${guideId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      skipJson: true,
    });
  }
}

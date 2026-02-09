import { API_BASE_URL, fetchJson } from "@/lib/api";
import type { LibraryJourney } from "../types";

/**
 * Mock data: same shape as expected from API. Replace getLibraryJourneys
 * implementation with fetchJson when API is available.
 */
const MOCK_LIBRARY_JOURNEYS: LibraryJourney[] = [
  {
    id: "1",
    title: "Exploring the Divine Nature",
    guideTitle: "The Nature of God",
    sections: [
      { id: "1-1", title: "Divine Omnipresence" },
      { id: "1-2", title: "Divine Sovereignty" },
      { id: "1-3", title: "Divine Holiness" },
    ],
    reflections: [
      {
        id: "1a",
        content:
          "Reflecting on how God's presence permeates every moment, I've begun to notice the sacred in the ordinary...",
        sectionTitle: "Divine Omnipresence",
        createdAt: "2 days ago",
      },
      {
        id: "1b",
        content:
          "This section challenged my understanding of free will versus God's sovereignty...",
        sectionTitle: "Divine Sovereignty",
        createdAt: "5 days ago",
      },
      {
        id: "1c",
        content:
          "God's holiness isn't distant perfection but invites us into transformation...",
        sectionTitle: "Divine Holiness",
        createdAt: "1 week ago",
      },
    ],
  },
  {
    id: "2",
    title: "A Season of Listening",
    guideTitle: "Prayer & Contemplation",
    sections: [
      { id: "2-1", title: "Scripture Reading" },
      { id: "2-2", title: "Contemplative Prayer" },
      { id: "2-3", title: "Prayer of Thanksgiving" },
    ],
    reflections: [
      {
        id: "2a",
        content:
          "Learning to sit in silence without filling it with words or thoughts has been challenging...",
        sectionTitle: "Contemplative Prayer",
        createdAt: "2 weeks ago",
      },
      {
        id: "2b",
        content:
          "When I approach each day looking for things to be grateful for, my whole perspective shifts...",
        sectionTitle: "Prayer of Thanksgiving",
        createdAt: "3 weeks ago",
      },
    ],
  },
  {
    id: "3",
    title: "Walking Through Psalms",
    guideTitle: "Psalms Study",
    sections: [
      { id: "3-1", title: "Psalm 23" },
      { id: "3-2", title: "Psalm 51" },
    ],
    reflections: [
      {
        id: "3a",
        content:
          "The raw honesty of the psalmist is striking. He doesn't hide his doubts or fears...",
        sectionTitle: "Psalm 23",
        createdAt: "1 month ago",
      },
    ],
  },
];

export class LibraryApiService {
  private static readonly BASE_URL = API_BASE_URL;

  /**
   * Returns the user's library (journeys with reflections).
   * Currently returns mock data; replace with fetchJson when API is ready.
   */
  static async getLibraryJourneys(): Promise<LibraryJourney[]> {
    // TODO: replace with real API when endpoint is available
    // return fetchJson<LibraryJourney[]>(`${this.BASE_URL}/library/journeys`, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // });
    return Promise.resolve(MOCK_LIBRARY_JOURNEYS);
  }
}

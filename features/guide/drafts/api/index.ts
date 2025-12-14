import { Guide } from "@/features/guide/types";
import { Draft } from "../types";

export class DraftApiService {
    private static readonly BASE_URL = 'http://localhost:3002/api/v1';
  
    static async saveDraft(userId: number, draftContent: Guide, draftKey: string): Promise<void> {
      const response = await fetch(`${this.BASE_URL}/drafts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, draftContent, draftKey, name: draftContent.name }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to save draft (${response.status})`);
      }
    }

    static async getDraft(draftKey: string): Promise<Draft> {
      const response = await fetch(`${this.BASE_URL}/drafts/${draftKey}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    }

    static async getUserDrafts(userId: number): Promise<Partial<Draft>[]> {
      const response = await fetch(`${this.BASE_URL}/drafts/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.json();
    }
  }
  
import { Guide } from "@/domain/guide/types";
import { Draft } from "../types";

export class DraftApiService {
    private static readonly BASE_URL = 'http://localhost:3002/api/v1';
  
    static async saveDraft(userId: number, draftContent: Guide, draftKey: string): Promise<Draft> {
      console.log('Saving draft', draftKey);
      const res = await fetch(`${this.BASE_URL}/drafts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, draftContent, draftKey, name: draftContent.name }),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to save draft (${res.status})`);
      }
      return res.json();
    }

    static async getDraft(draftKey: string) {
      const res = await fetch(`${this.BASE_URL}/drafts/${encodeURIComponent(draftKey)}`, {
        method: 'GET',
        cache: 'no-store',               // 🔑
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to load draft');
      return res.json();
    }

    static async publishDraft(draftKey: string): Promise<void> {
      const response = await fetch(`${this.BASE_URL}/drafts/${encodeURIComponent(draftKey)}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Failed to publish draft (${response.status}): ${errorText}`);
      }
    }
    

    static async getUserDrafts(userId: number): Promise<Partial<Draft>[]> {
      const response = await fetch(`${this.BASE_URL}/drafts/user/${userId}`, {
        method: 'GET',
        cache: 'no-store', // Always fetch fresh data
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Failed to load user drafts (${response.status})`);
      }
      return response.json();
    }

    
  }
  
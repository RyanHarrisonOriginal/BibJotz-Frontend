import { Guide, GuideListPayload, GuideListItem, GuideOptionsListPayload } from "../types";


export class GuideApiService {

    private static readonly BASE_URL = 'http://localhost:3002/api/v1';

    static async publishGuide(guide: Guide): Promise<void> {
        const response = await fetch(`${this.BASE_URL}/guides`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guide),
        });
        if (!response.ok) {
            throw new Error(`Failed to publish guide (${response.status})`);
        }
        return response.json();
    }

    static async getGuides(): Promise<GuideListPayload> {
        const response = await fetch(`${this.BASE_URL}/guides`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`Failed to get guides (${response.status})`);
        }
        return response.json();
    }

    static async getGuideOptions(): Promise<GuideOptionsListPayload> {
        const response = await fetch(`${this.BASE_URL}/guides/options`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`Failed to get guide options (${response.status})`);
        }
        return response.json();
    }

    static async deleteGuide(guideId: number): Promise<void> {
        console.log('Deleting guide:', guideId);
        const response = await fetch(`${this.BASE_URL}/guides/${guideId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`Failed to delete guide (${response.status})`);
        }
    }

}
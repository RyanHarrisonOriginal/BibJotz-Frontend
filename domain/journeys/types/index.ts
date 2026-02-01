export type CreateJourneyPayload = {
  guideId: number;
  name: string;
  userId?: number;
};

export type Journey = {
  id: number;
  guideId: number;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

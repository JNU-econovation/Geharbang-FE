export interface StepRecommendationCard {
  id: number;
  name: string;
  imageUrl: string;
  tags: string[];
  region?: string;
  address?: string;
}

export interface guestHouseRecommendationCard {
  id: number;
  guestHouseName: string;
  imageUrl: string;
  tags: string[];
  address?: string;
  location?: string;
  region?: string;
}

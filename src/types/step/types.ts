export interface GuestHouse {
  id: number;
  name: string;
  location: string;
  period: string;
  views: number;
  likes: number;
  createdAt: string;
  image: string;
}

export interface FilterState {
  location: string[];
  period: string[];
  workdays: string[];
  gender: string;
}

export type FilterOption = 'views' | 'likes' | 'recent';

export interface MyGuestHouse {
  id: number;
  guestHouseName: string;
  roadNameAddress: string;
  imageUrl: string;
  isClosed: boolean;
}

export type Status = "ACTIVE" | "INACTIVE";

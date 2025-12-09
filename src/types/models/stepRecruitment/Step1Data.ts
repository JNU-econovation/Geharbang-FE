export interface Step1Data {
  guestHouseName: string;
  workingRegion: string;
  location: SelectedAddressProps | null;
}

export interface SelectedAddressProps {
  roadAddress: string;
  jibunAddress: string;
  latitude: number;
  longitude: number;
}

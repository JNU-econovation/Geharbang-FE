import { Gender } from "../../Gender";

export interface ApplicationData {
  name: string;
  phoneNumber: string;
  birthDate: string;
  gender: Gender;
  availableStartDate: string;
  availableDayOfWeek: string[];
  selfIntroduction: string;
  mbti: string;
  style: string[];
  instagramId: string;
  imageUrl: string;
}
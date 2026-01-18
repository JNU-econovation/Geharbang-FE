export interface ApplicationCard {
  applicationRecordId: number;
  name: string;
  imageUrl: string;
  applicationStatus: "합격" | "대기중";
  appliedAt: string;
}

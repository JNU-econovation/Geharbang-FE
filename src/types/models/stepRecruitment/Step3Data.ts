import { File } from "../../File";
import { Feature } from "./Feature";

export interface Step3Data {
  title: string;
  introduction: string;
  advantages: Feature[];
  employeeBenefits: Feature[];

  // 백엔드에서 응답 받은 URL
  mainImageUrls: string[];
  introImageUrls: string[];

  // 프론트 전용 상태(아직 업로드 안 된 로컬 파일들)
  mainImageFiles: File[];
  introImageFiles: File[];
}

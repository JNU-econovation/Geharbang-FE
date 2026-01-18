import { ApplicationCard } from "../../models/applicaionList/ApplicationCard";

export interface ApplicationListResponse {
  title: string;
  submittedApplications: ApplicationCard[];
}

export type TabType = 'pending' | 'approved' | 'rejected';

export interface OperatorCardData {
  id: string;
  guestHouseName: string;
  representativeName: string;
  documentType: string;
  submittedAt: string;
  status: TabType;
}

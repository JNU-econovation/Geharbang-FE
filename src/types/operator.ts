export type TabType = 'pending' | 'approved' | 'rejected';

export interface OperatorCardData {
  id: string;
  guestHouseName: string;
  representativeName: string;
  documentType: string;
  submittedAt: string;
  status: TabType;
}

export interface CertificateApiResponse {
  id: number;
  guestHouseName: string;
  ownerName: string;
  certificateType: string;
  status: string;
  createdAt: string;
}

export interface CertificateDetailApiResponse {
  guestHouseName: string;
  ownerName: string;
  phoneNumber: string;
  certificateType: string;
  fileUrl: string;
  fileName: string;
}

export const mapApiStatusToTabType = (apiStatus: string): TabType => {
  switch (apiStatus) {
    case '검토_대기':
      return 'pending';
    case '승인_완료':
      return 'approved';
    case '거부됨':
      return 'rejected';
    default:
      return 'pending';
  }
};

export const mapCertificateTypeToApi = (
  type: 'business' | 'tourism',
): string => {
  return type === 'business' ? '영업신고증' : '관광사업등록증';
};

export const mapApiToCertificateType = (
  apiType: string,
): 'business' | 'tourism' => {
  return apiType === '영업신고증' ? 'business' : 'tourism';
};

export const convertCertificateToCardData = (
  cert: CertificateApiResponse,
): OperatorCardData => {
  return {
    id: String(cert.id),
    guestHouseName: cert.guestHouseName,
    representativeName: cert.ownerName,
    documentType: cert.certificateType,
    submittedAt: cert.createdAt,
    status: mapApiStatusToTabType(cert.status),
  };
};

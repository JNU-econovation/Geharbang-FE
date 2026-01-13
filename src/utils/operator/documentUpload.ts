import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

import { File } from '@/src/types/File';

export type DocumentType = 'business' | 'tourism';

/**
 * 서류 파일 업로드 처리
 * @param documentType - 서류 종류 (business: 영업신고증, tourism: 관광사업등록증)
 * @returns 업로드된 파일 정보 또는 null
 */
export const uploadDocument = async (
  documentType: DocumentType,
): Promise<File | null> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        documentType === 'business'
          ? 'application/pdf'
          : ['application/pdf', 'image/jpeg', 'image/png'],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return null;

    const file = result.assets[0];

    const maxSize = 10 * 1024 * 1024;
    if (file.size && file.size > maxSize) {
      Alert.alert('오류', '파일 크기는 최대 10MB까지 업로드 가능합니다.');
      return null;
    }

    const uploadedFileData: File = {
      uri: file.uri,
      type: file.mimeType || 'application/pdf',
      name: file.name,
    };

    return uploadedFileData;
  } catch (error) {
    Alert.alert('오류', '파일 업로드 중 오류가 발생했습니다.');
    return null;
  }
};

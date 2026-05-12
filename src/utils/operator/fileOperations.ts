import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Platform } from 'react-native';
import { buildAssetUrl } from '@/src/config/url';

type FileInfo = {
  exists: boolean;
  size?: number;
};

type FileSystemLegacy = {
  documentDirectory: string | null;
  cacheDirectory: string | null;
  getInfoAsync: (fileUri: string) => Promise<FileInfo>;
  deleteAsync: (fileUri: string) => Promise<void>;
  downloadAsync: (uri: string, fileUri: string) => Promise<{ uri: string }>;
  getContentUriAsync: (fileUri: string) => Promise<string>;
};

// `expo-file-system/legacy` 타입 정의가 현재 Expo SDK 조합에서 tsc를 깨뜨려서,
// 이 파일에서 실제로 사용하는 최소한의 surface만 좁은 타입으로 다룬다.
const FileSystem = require('expo-file-system/legacy') as FileSystemLegacy;

/**
 * 파일 미리보기 (브라우저에서 열기)
 * @param fileUrl - 서버가 제공한 파일 경로 (예: "/files/certificate.pdf")
 * @param _fileName - 파일 이름 (사용하지 않음)
 * @returns 성공 여부
 */
export const previewFile = async (
  fileUrl: string,
  _fileName: string,
): Promise<boolean> => {
  try {
    const fullUrl = buildAssetUrl(fileUrl);
    if (!fullUrl) {
      Alert.alert('오류', '파일 URL이 올바르지 않습니다.');
      return false;
    }

    await WebBrowser.openBrowserAsync(fullUrl, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      controlsColor: '#00A6F4',
      toolbarColor: '#FFFFFF',
    });

    return true;
  } catch (error) {
    console.error('파일 미리보기 오류:', error);
    Alert.alert('오류', '파일을 열 수 없습니다.');
    return false;
  }
};

/**
 * 파일 다운로드
 * @param fileUrl - 서버가 제공한 파일 경로 (예: "/files/certificate.pdf")
 * @param fileName - 저장할 파일 이름
 * @param _onProgress - (사용되지 않음) 다운로드 진행률 콜백
 * @returns 다운로드된 파일 URI 또는 null
 */
export const downloadFile = async (
  fileUrl: string,
  fileName: string,
  _onProgress?: (progress: number) => void,
): Promise<string | null> => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('오류', '이 기기에서는 파일 공유 기능을 사용할 수 없습니다.');
      return null;
    }

    const fullUrl = buildAssetUrl(fileUrl);
    if (!fullUrl) {
      Alert.alert('오류', '파일 URL이 올바르지 않습니다.');
      return null;
    }

    const directory =
      Platform.OS === 'ios'
        ? FileSystem.documentDirectory
        : FileSystem.cacheDirectory;
    if (!directory) {
      Alert.alert('오류', '파일 저장 경로를 찾을 수 없습니다.');
      return null;
    }

    const localUri = `${directory}${fileName}`;

    const downloadResult = await FileSystem.downloadAsync(fullUrl, localUri);

    // 파일 크기 확인
    const fileInfo = await FileSystem.getInfoAsync(downloadResult.uri);
    const maxSize = 10 * 1024 * 1024;

    if (fileInfo.exists && typeof fileInfo.size === 'number' && fileInfo.size > maxSize) {
      await FileSystem.deleteAsync(downloadResult.uri);
      Alert.alert('오류', '파일 크기는 최대 10MB까지 다운로드 가능합니다.');
      return null;
    }

    // Android에서는 content URI로 변환 필요
    let shareUri = downloadResult.uri;
    if (Platform.OS === 'android') {
      shareUri = await FileSystem.getContentUriAsync(downloadResult.uri);
    }

    await Sharing.shareAsync(shareUri, {
      UTI: 'application/pdf',
      mimeType: 'application/pdf',
      dialogTitle: '파일 저장',
    });

    return downloadResult.uri;
  } catch (error) {
    console.error('파일 다운로드 오류:', error);
    Alert.alert('오류', '파일 다운로드 중 오류가 발생했습니다.');
    return null;
  }
};

/**
 * 로컬 캐시된 파일 삭제
 * @param fileName - 삭제할 파일 이름
 * @returns 성공 여부
 */
export const deleteLocalFile = async (fileName: string): Promise<boolean> => {
  try {
    const directory =
      Platform.OS === 'ios'
        ? FileSystem.documentDirectory
        : FileSystem.cacheDirectory;
    if (!directory) {
      return false;
    }

    const fileUri = `${directory}${fileName}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (fileInfo.exists) {
      await FileSystem.deleteAsync(fileUri);
      return true;
    }

    return false;
  } catch (error) {
    console.error('파일 삭제 오류:', error);
    return false;
  }
};

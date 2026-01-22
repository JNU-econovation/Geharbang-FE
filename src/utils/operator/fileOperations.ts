import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Platform } from 'react-native';

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
    // 서버 URL로 직접 브라우저에서 열기 (이미지처럼)
    const fullUrl = `${process.env.EXPO_PUBLIC_BASE_URL}${fileUrl}`;

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

    const fullUrl = `${process.env.EXPO_PUBLIC_BASE_URL}${fileUrl}`;

    const directory =
      Platform.OS === 'ios'
        ? FileSystem.documentDirectory
        : FileSystem.cacheDirectory;
    const localUri = `${directory}${fileName}`;

    const downloadResult = await FileSystem.downloadAsync(fullUrl, localUri);

    // 파일 크기 확인
    const fileInfo = await FileSystem.getInfoAsync(downloadResult.uri);
    const maxSize = 10 * 1024 * 1024;

    if (fileInfo.exists && fileInfo.size > maxSize) {
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

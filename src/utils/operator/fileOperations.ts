import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';

/**
 * 파일 미리보기
 * @param fileUrl - 파일 URL (로컬 또는 원격)
 * @param fileName - 파일 이름
 * @returns 성공 여부
 */
export const previewFile = async (
  fileUrl: string,
  fileName: string,
): Promise<boolean> => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('오류', '이 기기에서는 파일 공유 기능을 사용할 수 없습니다.');
      return false;
    }

    let fileUri = fileUrl;

    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
      // iOS는 documentDirectory, Android는 cacheDirectory 사용
      const directory = Platform.OS === 'ios'
        ? FileSystem.documentDirectory
        : FileSystem.cacheDirectory;
      const localUri = `${directory}${fileName}`;

      // 파일이 이미 존재하는지 확인
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (!fileInfo.exists) {
        // 파일 다운로드
        const downloadResult = await FileSystem.downloadAsync(fileUrl, localUri);
        fileUri = downloadResult.uri;
      } else {
        fileUri = localUri;
      }
    }

    // Android에서는 content URI로 변환 필요
    let shareUri = fileUri;
    if (Platform.OS === 'android') {
      shareUri = await FileSystem.getContentUriAsync(fileUri);
    }

    await Sharing.shareAsync(shareUri, {
      UTI: 'application/pdf',
      mimeType: 'application/pdf',
      dialogTitle: '파일 미리보기',
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
 * @param fileUrl - 파일 URL (원격)
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

    // iOS는 documentDirectory, Android는 cacheDirectory 사용
    const directory = Platform.OS === 'ios'
      ? FileSystem.documentDirectory
      : FileSystem.cacheDirectory;
    const localUri = `${directory}${fileName}`;

    // 파일 다운로드
    const downloadResult = await FileSystem.downloadAsync(fileUrl, localUri);

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
    // iOS는 documentDirectory, Android는 cacheDirectory 사용
    const directory = Platform.OS === 'ios'
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

import { TextStyle } from 'react-native';

export interface TextSizeProps {
  size: number;
  color?: string;
  weight?: TextStyle['fontWeight'];
  content: string;
}

import { ViewStyle } from 'react-native';

interface DropdownPositionParams {
  position?: 'left' | 'right' | 'center';
  top?: number;
  right?: number;
  left?: number;
}

export const getDropdownPositionStyles = ({
  position = 'right',
  top,
  right,
  left,
}: DropdownPositionParams): ViewStyle => {
  const positionStyles: ViewStyle = {
    top: top ?? '150%',
    marginTop: 4,
    zIndex: 1000,
    elevation: 5,
    minWidth: 100,
  };

  if (position === 'right' && right !== undefined) {
    positionStyles.right = right;
  } else if (position === 'left' && left !== undefined) {
    positionStyles.left = left;
  } else if (position === 'center') {
    positionStyles.left = '50%';
    positionStyles.transform = [{ translateX: -50 }];
  }

  return positionStyles;
};

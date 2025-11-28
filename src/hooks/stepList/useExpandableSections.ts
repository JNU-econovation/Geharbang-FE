import { useState } from 'react';

export const useExpandableSections = <T extends string>(
  initialState: Record<T, boolean>,
) => {
  const [expanded, setExpanded] = useState(initialState);

  const toggle = (section: T) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return { expanded, toggle };
};

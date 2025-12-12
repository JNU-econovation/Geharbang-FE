import { useEffect, useState } from 'react';

interface UseWorkingCalculatorProps {
  mode: 'manual' | 'auto';
  totalDays?: number;
  workingCount: number | '';
  closedCount: number | '';
  setWorkingCount: (v: number | '') => void;
  setClosedCount: (v: number | '') => void;
  setBothCounts?: (working: number | '', closed: number | '') => void;
}

export function useWorkingCalculator({
  mode,
  totalDays = 7,
  workingCount: initialWorking,
  closedCount: initialClosed,
  setWorkingCount: setGlobalWorking,
  setClosedCount: setGlobalClosed,
  setBothCounts,
}: UseWorkingCalculatorProps) {
  const [localWorking, setLocalWorking] = useState(initialWorking);
  const [localClosed, setLocalClosed] = useState(initialClosed);

  const isValidAutoRange = (value: number) => value >= 1 && value <= 7;

  const updateWorkingCount = (count: number | '') => {
    if (mode === 'auto') {
      if (count === '') {
        setLocalWorking('');
        setLocalClosed('');
        if (setBothCounts) {
          setBothCounts('', '');
        } else {
          setGlobalWorking('');
          setGlobalClosed('');
        }
        return;
      }

      if (!isValidAutoRange(count)) {
        return;
      }

      setLocalWorking(count);

      const newClosed = Math.max(totalDays - count, 0);
      setLocalClosed(newClosed);

      if (setBothCounts) {
        setBothCounts(count, newClosed);
      } else {
        setGlobalWorking(count);
        setGlobalClosed(newClosed);
      }

      return;
    }

    setLocalWorking(count);

    if (count === '') {
      setLocalClosed('');
      setGlobalWorking('');
      setGlobalClosed('');
      return;
    }

    if (typeof localClosed === 'number' && localClosed > count) {
      setLocalClosed(count);
      setGlobalClosed(count);
    }

    setGlobalWorking(count);
  };

  const updateClosedCount = (count: number | '') => {
    if (mode !== 'manual') return;

    setLocalClosed(count);

    if (count === '') {
      setGlobalClosed('');
      return;
    }

    if (localWorking === '') {
      setGlobalClosed(count);
      return;
    }

    if (typeof localWorking === 'number' && count > localWorking) {
      setLocalClosed(localWorking);
      setGlobalClosed(localWorking);
      return;
    }

    setGlobalClosed(count);
  };

  useEffect(() => setLocalWorking(initialWorking), [initialWorking]);
  useEffect(() => setLocalClosed(initialClosed), [initialClosed]);

  return {
    workingCount: localWorking,
    closedCount: localClosed,
    updateWorkingCount,
    updateClosedCount,
    isAuto: mode === 'auto',
  };
}

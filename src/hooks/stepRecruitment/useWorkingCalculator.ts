import { useEffect, useRef, useState } from "react";

interface UseWorkingCalculatorProps {
  mode: "manual" | "auto";
  totalDays?: number;
  workingCount: number | "";
  closedCount: number | "";
  setWorkingCount: (v: number | "") => void;
  setClosedCount: (v: number | "") => void;
  setBothCounts?: (working: number | "", closed: number | "") => void;
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
  const [localWorking, setLocalWorking] = useState<number | "">(initialWorking);
  const [localClosed, setLocalClosed] = useState<number | "">(initialClosed);

  const prevModeRef = useRef<"manual" | "auto">(mode);
  const isAuto = mode === "auto";

  const syncToParent = (working: number | "", closed: number | "") => {
    if (setBothCounts) {
      setBothCounts(working, closed);
    } else {
      setGlobalWorking(working);
      setGlobalClosed(closed);
    }
  };

  const updateWorkingCount = (count: number | "") => {
    if (isAuto) {
      if (count === "") {
        setLocalWorking("");
        setLocalClosed("");
        syncToParent("", "");
        return;
      }

      const nextClosed = Math.max(totalDays - count, 0);
      setLocalWorking(count);
      setLocalClosed(nextClosed);
      syncToParent(count, nextClosed);
      return;
    }

    setLocalWorking(count);
    syncToParent(count, localClosed);
  };

  const updateClosedCount = (count: number | "") => {
    if (isAuto) return;

    setLocalClosed(count);
    syncToParent(localWorking, count);
  };

  useEffect(() => {
    if (prevModeRef.current !== mode) {
      setLocalWorking("");
      setLocalClosed("");
      syncToParent("", "");
      prevModeRef.current = mode;
    }
  }, [mode]);

  useEffect(() => {
    setLocalWorking(initialWorking);
    setLocalClosed(initialClosed);
  }, [initialWorking, initialClosed]);

  return {
    workingCount: localWorking,
    closedCount: localClosed,
    updateWorkingCount,
    updateClosedCount,
    isAuto,
  };
}

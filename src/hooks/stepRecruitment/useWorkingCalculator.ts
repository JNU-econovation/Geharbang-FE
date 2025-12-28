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

type Count = number | "";

export function useWorkingCalculator({
  mode,
  totalDays = 7,
  workingCount: initialWorking,
  closedCount: initialClosed,
  setWorkingCount: setGlobalWorking,
  setClosedCount: setGlobalClosed,
  setBothCounts,
}: UseWorkingCalculatorProps) {
  const [localWorking, setLocalWorking] = useState<Count>(initialWorking);
  const [localClosed, setLocalClosed] = useState<Count>(initialClosed);
  const prevModeRef = useRef<"manual" | "auto">(mode);

  const normalizeCount = (v: unknown): Count | undefined => {
    if (v === "") return "";
    if (typeof v !== "number") return undefined;
    if (!Number.isFinite(v)) return undefined;
    if (Number.isNaN(v)) return undefined;

    return v;
  };

  const isValidAutoRange = (value: number) => value >= 1 && value <= totalDays;

  const resetBoth = () => {
    setLocalWorking("");
    setLocalClosed("");
    if (setBothCounts) {
      setBothCounts("", "");
    } else {
      setGlobalWorking("");
      setGlobalClosed("");
    }
  };

  const updateWorkingCount = (raw: Count) => {
    const count = normalizeCount(raw);
    if (count === undefined) return;

    if (mode === "auto") {
      if (count === "") {
        resetBoth();
        return;
      }

      if (!isValidAutoRange(count)) return;

      const newClosed = Math.max(totalDays - count, 0);

      setLocalWorking(count);
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
    setGlobalWorking(count);
  };

  const updateClosedCount = (raw: Count) => {
    if (mode !== "manual") return;

    const count = normalizeCount(raw);
    if (count === undefined) return;

    setLocalClosed(count);
    setGlobalClosed(count);
  };

  useEffect(() => setLocalWorking(initialWorking), [initialWorking]);
  useEffect(() => setLocalClosed(initialClosed), [initialClosed]);

  useEffect(() => {
    if (prevModeRef.current !== mode) {
      resetBoth();
      prevModeRef.current = mode;
    }
  }, [mode, setBothCounts, setGlobalWorking, setGlobalClosed]);

  return {
    workingCount: localWorking,
    closedCount: localClosed,
    updateWorkingCount,
    updateClosedCount,
    isAuto: mode === "auto",
  };
}

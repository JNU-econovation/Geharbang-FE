import { useState } from "react";

interface UseWorkingCalculatorProps {
  mode: "manual" | "auto";
  totalDays?: number;
  initialWorkingCount?: number | "";
  initialClosedCount?: number | "";
}

export function useWorkdayCalculator({
  mode,
  totalDays = 7,
  initialWorkingCount = 0,
  initialClosedCount = 0,
}: UseWorkingCalculatorProps) {
  const [workingCount, setWorkingCount] = useState(initialWorkingCount);
  const [closedCount, setClosedCount] = useState(initialClosedCount);

  const updateWorkingCount = (count: number) => {
    if (mode === "auto") {
      setWorkingCount(count);
      setClosedCount(Math.max(totalDays - count, 0));
    } else {
      setWorkingCount(count);
    }
  };

  const updateClosedCount = (count: number) => {
    if (mode === "manual") setClosedCount(count);
  };

  return {
    workingCount,
    closedCount,
    updateWorkingCount,
    updateClosedCount,
    isAuto: mode === "auto",
  };
}

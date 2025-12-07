import { useState } from "react";

interface UseWorkingCalculatorProps {
  mode: "manual" | "auto";
  totalDays?: number;
  initialWorkingCount?: number | "";
  initialClosedCount?: number | "";
}

export function useWorkingCalculator({
  mode,
  totalDays = 7,
  initialWorkingCount = "",
  initialClosedCount = "",
}: UseWorkingCalculatorProps) {
  const [workingCount, setWorkingCount] = useState<number | "">(
    initialWorkingCount
  );
  const [closedCount, setClosedCount] = useState<number | "">(
    initialClosedCount
  );

  const isValidAutoRange = (value: number) => value >= 1 && value <= 7;

  const updateWorkingCount = (count: number | "") => {
    if (count === "") {
      setWorkingCount("");
      if (mode === "auto") setClosedCount("");
      return;
    }

    if (mode === "auto" && !isValidAutoRange(count)) return;

    if (mode === "auto") {
      setWorkingCount(count);
      setClosedCount(Math.max(totalDays - count, 0));
    } else {
      setWorkingCount(count);
    }

    if (
      closedCount !== "" &&
      typeof closedCount === "number" &&
      typeof count === "number" &&
      count < closedCount
    ) {
      setClosedCount(count);
    }
  };

  const updateClosedCount = (count: number | "") => {
    if (mode !== "manual") return;

    if (count === "") {
      setClosedCount("");
      return;
    }

    if (workingCount === "") {
      setClosedCount(count);
      return;
    }

    if (typeof workingCount === "number" && count > workingCount) {
      setClosedCount(workingCount);
      return;
    }

    setClosedCount(count);
  };

  return {
    workingCount,
    closedCount,
    updateWorkingCount,
    updateClosedCount,
    isAuto: mode === "auto",
  };
}

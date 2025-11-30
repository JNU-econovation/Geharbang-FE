export const useMultiSelect = (
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const toggleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return { toggleSelect };
};

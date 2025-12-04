import FormField from "@/src/components/ui/Form/FormField";
import OptionGrid from "@/src/components/ui/OptionGrid";
import { REGION_OPTION } from "@/src/utils/constants/options";

interface WorkingRegionProps {
  selectedRegion: string;
  onChangeOption: (region: string) => void;
  errorMsg: string;
}

export default function WorkingRegion({
  selectedRegion,
  onChangeOption,
  errorMsg,
}: WorkingRegionProps) {
  return (
    <FormField label='근무 지역' required={true} errorMessage={errorMsg}>
      <OptionGrid
        options={REGION_OPTION}
        selected={selectedRegion}
        onSelect={onChangeOption}
      />
    </FormField>
  );
}

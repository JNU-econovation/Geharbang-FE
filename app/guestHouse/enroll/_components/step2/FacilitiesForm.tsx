import React, { useState } from 'react';
import { View } from 'react-native';

import AppendableInputGroupContainer from '@/src/components/ui/Form/AppendableInputGroupContainer';
import FormField from '@/src/components/ui/Form/FormField';
import { Feature } from '@/src/types/models/stepRecruitment/Feature';

const FacilitiesForm = () => {
  const [facilities, setFacilities] = useState<Feature[]>([]);

  return (
    <View>
      <FormField
        label="제공 편의시설"
        required={true}
        description="최대 10개까지 등록할 수 있습니다"
      >
        <AppendableInputGroupContainer
          features={facilities}
          setFeatures={setFacilities}
          maxLimit={10}
          buttonLabel="편의시설 추가"
          placeholder="예: 공용주방, 세탁시설"
          error={false}
          clearError={() => {}}
        />
      </FormField>
    </View>
  );
};

export default FacilitiesForm;

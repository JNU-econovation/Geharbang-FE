import { router } from 'expo-router';
import { useEffect } from 'react';

export default function GuestHouseEnrollIndex() {
  useEffect(() => {
    router.replace('/guestHouse/enroll/step1');
  }, []);

  return null;
}

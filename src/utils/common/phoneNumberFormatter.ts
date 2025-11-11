export function formatPhoneNumber(phoneNumber: string): string {
  const phoneNumberRegex = /^[0-9\b -]{0,13}$/;
  if (phoneNumberRegex.test(phoneNumber)) {
    if (phoneNumber.length === 10) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    if (phoneNumber.length === 11 || phoneNumber.length === 13) {
      return phoneNumber
        .replace(/-/g, "")
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  }
  return phoneNumber;
}

export function formatUpperCase(text: string): string {
  if (/[\u3131-\uD79D]/.test(text)) {
    return "";
  }
  let onlyLetters = text.replace(/[^A-Za-z]/g, "");
  onlyLetters = onlyLetters.toUpperCase();

  return onlyLetters;
}

export function isNumberOnly(str: string): boolean {
  const regex = /^[0-9]+$/;

  return regex.test(String(str));
}

const validPasswordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export function isValidPassword(pass: string): boolean {
  if (!pass || pass === "") {
    return false;
  }

  const match = validPasswordRegex.test(pass);
  return match;
}

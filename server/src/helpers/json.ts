function isValid(str: string): boolean {
  try {
    JSON.stringify(JSON.parse(str));
    return true;
  } catch (error) {
    return false;
  }
}

function parse<T = unknown>(str: string): T {
  return JSON.parse(str) as T;
}

export default { isValid, parse };

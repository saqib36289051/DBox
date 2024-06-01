export const getFirstLetters = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
};

export const checkUniqueSymbols = (value: string) => {
  const uniqueSymbols = new Set(value);
  return uniqueSymbols.size === value.length;
};

export const transformTextMapToOpts = (textMap: Map<any, any>) => {
  return Array.from(textMap).map(([value, label]) => ({
    label,
    value,
  }));
};

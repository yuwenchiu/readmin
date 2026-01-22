export const getLanguageName = (code: string, locale = "en") => {
  const displayNames = new Intl.DisplayNames([locale], { type: "language" });
  return displayNames.of(code);
};

import languages, { type Language } from "~/utils/languages";
import type { BoundStateCreator } from "~/hooks/useBoundStore";

export type LanguageSlice = {
  language: Language;
  setLanguage: (newLanguage: Language) => void;
};

export const createLanguageSlice: BoundStateCreator<LanguageSlice> = (set) => ({
  language:
    typeof localStorage != "undefined" && localStorage.getItem("current_language") != null
      ? languages.find((l) => l.code == localStorage.getItem("current_language")!)!
      : languages[1]!,
  setLanguage: (newLanguage: Language) => {
    set({ language: newLanguage });
    localStorage.setItem("current_language", newLanguage.code);
  },
});

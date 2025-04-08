import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/auth";
import { RootState } from "../redux/store";

const getAttribute = (name: string) =>
  document?.querySelector("html")?.getAttribute(name);
const setAttribute = (name: string, value: string) =>
  document?.querySelector("html")?.setAttribute(name, value);

export const Regional = {
  language: {
    get: () => getAttribute("lang") ?? "en",
    set: (lang: string) => setAttribute("lang", lang),
  },
  direction: {
    get: () => getAttribute("dir"),
    set: (dir: string) => setAttribute("dir", dir),
  },
};

export type Directions = "ltr" | "rtl";
/**
 * Changes the langauge of the document
 */
function setDocumentAttributes(dir: Directions, lang: string) {
  document.getElementsByTagName("html")[0].setAttribute("lang", lang);
  document.getElementsByTagName("html")[0].setAttribute("dir", dir);
}

const useRTL = () => {
  const dispatch = useDispatch();
  const { language: lang } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );

  const handleLangChange = () => {
    dispatch(setLanguage(lang === "ar" ? "en" : "ar"));
    document.body.classList.toggle("rtl_body");
    setDocumentAttributes(
      lang === "en" ? "rtl" : "ltr",
      lang === "en" ? "ar" : "en"
    );
  };

  return { handleLangChange };
};

export default useRTL;

export const useGetLanguage = () => {
  const language = useSelector(
    (state: RootState) => state.centeralizedStateData.user.language
  );
  return language;
};

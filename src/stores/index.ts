import { configure } from "mobx";
import auth from "./auth";
import vacancies from "./vacancies";
import theme from "./theme";

configure({ enforceActions: "always" });

const Store = {
  auth,
  vacancies,
  theme,
} as const;

export type AppState = typeof Store;

export default Store;

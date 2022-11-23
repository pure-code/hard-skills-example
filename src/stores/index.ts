import { configure } from "mobx";
import auth from "./auth";
import jobs from "./jobs";
import theme from "./theme";

configure({ enforceActions: "always" });

const Store = {
  auth,
  jobs,
  theme,
} as const;

export type AppState = typeof Store;

export default Store;

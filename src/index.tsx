import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./hooks/useStore";
import stores from "./stores";
import RoutesManager from "./Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import "./baseStyles/base.css";
import "./baseStyles/fontFace.css";
import "./baseStyles/normalize.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <Provider value={stores}>
        <RoutesManager />
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
);

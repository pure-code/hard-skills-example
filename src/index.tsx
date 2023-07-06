import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "shared/lib/useStore";
import stores from "shared/stores";
import RoutesManager from "routes";
import ErrorBoundary from "shared/ui/ErrorBoundary";
import "./app/styles/base.css";
import "./app/styles/fontFace.css";
import "./app/styles/normalize.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://94e26b4c8fa2402eb9082a7adb5e6978@o492531.ingest.sentry.io/4504226665136128",
    autoSessionTracking: true,
    release: "pipelite@v1",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

// eslint-disable-next-line no-console
console.log(
  "%c PureCode Frontend dev",
  `
    padding: 4px 24px 4px 2px;
    border-radius: 4px;
    background: rgb(57,223,132);
    background: linear-gradient(90deg, #7487eb 0%, rgba(57,223,132,1) 76%, rgb(98 199 120 / 10%) 100%);
    color: #000;
    font-size: 13px;
    font-weight: bold;
    margin: 6px 0;
  `,
  "Ищу работу — t.me/@pure_code_ru, aleksey-finding-job@yandex.ru © 2023"
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

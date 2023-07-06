import { ReactNode } from "react";
import { ErrorBoundary as SentryErrorBoundary } from "@sentry/react";

const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <SentryErrorBoundary
      fallback={
        <div>
          <h1>Что-то пошло не так.</h1>
          <button type="button" onClick={() => window.location.reload()}>
            обновить страницу
          </button>
        </div>
      }
    >
      {children}
    </SentryErrorBoundary>
  );
};

export default ErrorBoundary;

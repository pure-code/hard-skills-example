import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";
import ErrorBoundary from "shared/ui/ErrorBoundary";
import Spinner from "shared/ui/Spinner";

const Board = lazy(() => import("pages/Board"));

const PrivateRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path={ROUTES.DASHBOARD} element={<h1>Dashboard</h1>} />
      <Route
        path={ROUTES.BOARD}
        element={
          <ErrorBoundary>
            <Board />
          </ErrorBoundary>
        }
      />
      <Route
        path={`${ROUTES.BOARD}/:vacancyId`}
        element={
          <ErrorBoundary>
            <Board />
          </ErrorBoundary>
        }
      />
      <Route
        path={`${ROUTES.BOARD}/:vacancyId/:candidateId`}
        element={
          <ErrorBoundary>
            <Board />
          </ErrorBoundary>
        }
      />
      <Route path="*" element={<Navigate to={`${ROUTES.BOARD}`} />} />
    </Routes>
  </Suspense>
);

export default PrivateRoutes;

import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import ErrorBoundary from '../components/ErrorBoundary';
import Spinner from '../components/Spinner';

const Board = lazy(() => import('../pages/Board'));

const PrivateRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route
        path={ROUTES.DASHBOARD}
        element={<h1>Dashboard</h1>}
      />
      <Route
        path={ROUTES.BOARD}
        element={(
          <ErrorBoundary>
            <Board />
          </ErrorBoundary>
        )}
      />
      <Route
        path={`${ROUTES.BOARD}/:jobId`}
        element={(
          <ErrorBoundary>
            <Board />
          </ErrorBoundary>
        )}
      />
      <Route
        path={`${ROUTES.BOARD}/:jobId/:candidateId`}
        element={(
          <ErrorBoundary>
            <Board />
          </ErrorBoundary>
          )}
      />
      <Route path="*" element={<Navigate to={`${ROUTES.BOARD}/job1`} />} />
    </Routes>
  </Suspense>

);

export default PrivateRoutes;

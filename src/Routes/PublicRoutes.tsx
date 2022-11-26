import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>PublicRoutes</div>} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
    </Routes>
  );
};

export default PublicRoutes;

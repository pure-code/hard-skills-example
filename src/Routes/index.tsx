import { observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../hooks/useStore";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { theme } from "../constants/theme";
import Spinner from "../components/Spinner";
import Notifications from "../components/Notifications";
import { ROUTES } from "../constants/routes";

const RoutesManager = () => {
  const {
    auth: { isAuthorized, createGuestAccount },
    theme: { isDarkTheme },
  } = useStore();
  const Route = isAuthorized ? PrivateRoutes : PublicRoutes;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate(ROUTES.BOARD);
      createGuestAccount();
    }
  }, [isAuthorized]);

  return (
    <ThemeProvider theme={theme(isDarkTheme)}>
      <Notifications />
      {isAuthorized ? <Route /> : <Spinner />}
    </ThemeProvider>
  );
};

export default observer(RoutesManager);

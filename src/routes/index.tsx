import { observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useStore } from "shared/lib/useStore";
import { theme } from "shared/constants/theme";
import Spinner from "shared/ui/Spinner";
import Notifications from "shared/ui/Notifications";
import { ROUTES } from "shared/constants/routes";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

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

import { observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { theme } from "../constants/theme";
import Spinner from "../components/Spinner";

const RoutesManager = () => {
  const {
    auth: { isAuthorized, createGuestAccount },
    theme: { isDarkTheme },
  } = useStore();
  const Route = isAuthorized ? PrivateRoutes : PublicRoutes;

  useEffect(() => {
    if (!isAuthorized) {
      createGuestAccount();
    }
  }, [isAuthorized]);

  return (
    <ThemeProvider theme={theme(isDarkTheme)}>
      {isAuthorized ? <Route /> : <Spinner />}
    </ThemeProvider>
  );
};

export default observer(RoutesManager);

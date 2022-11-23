import { observer } from "mobx-react-lite";
import { ThemeProvider } from "styled-components";
import { useStore } from "../hooks/useStore";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { theme } from "../constants/theme";

const RoutesManager = () => {
  const {
    auth: { isAuthorized },
    theme: { isDarkTheme },
  } = useStore();
  const Route = isAuthorized ? PrivateRoutes : PublicRoutes;

  return (
    <ThemeProvider theme={theme(isDarkTheme)}>
      <Route />
    </ThemeProvider>
  );
};

export default observer(RoutesManager);

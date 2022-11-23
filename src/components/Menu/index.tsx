import { useLocation } from "react-router";
import { ROUTES } from "../../constants/routes";
import { MENU_NAMES } from "../../constants/menuNames";

import { MenuContainer, MenuLink } from "./styled";

const Menu = () => {
  const { pathname } = useLocation();

  return (
    <MenuContainer>
      <MenuLink selected={pathname === ROUTES.DASHBOARD} to={ROUTES.DASHBOARD}>
        {MENU_NAMES.DASHBOARD}
      </MenuLink>
      <MenuLink selected={pathname === ROUTES.BOARD} to={ROUTES.BOARD}>
        {MENU_NAMES.BOARD}
      </MenuLink>
    </MenuContainer>
  );
};

export default Menu;

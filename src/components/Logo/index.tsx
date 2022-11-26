import { ReactComponent as LogoIcon } from "../../assets/logo.svg";

import { LogoContainer } from "./styled";

const Logo = () => (
  <LogoContainer>
    <LogoIcon />
    <span>Pipelite</span>
  </LogoContainer>
);

export default Logo;

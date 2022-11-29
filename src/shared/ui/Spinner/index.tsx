import { ReactComponent as LoaderIcon } from "../icons/loader.svg";

import { SpinnerContainer, Spin } from "./styled";

const Spinner = () => (
  <SpinnerContainer>
    <Spin>
      <LoaderIcon />
    </Spin>
  </SpinnerContainer>
);

export default Spinner;

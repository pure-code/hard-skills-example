import ErrorBoundary from "shared/ui/ErrorBoundary";
import { PopupProps } from "./interfaces";

import { PopupContainer, Overlay, Content } from "./styled";

const Popup = ({ children, onClose }: PopupProps) => (
  <PopupContainer>
    <Overlay onClick={onClose} />
    <Content>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Content>
  </PopupContainer>
);

export default Popup;

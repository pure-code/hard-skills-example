import { observer } from "mobx-react-lite";
import Popup from "shared/ui/Popup";

import { Container, Confirm, Cancel, ButtonsWrap } from "./styled";

export interface ConfirmPopupProps {
  confirmBtnTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmPopup = ({
  onConfirm,
  onCancel,
  confirmBtnTitle,
}: ConfirmPopupProps) => {
  return (
    <Popup onClose={onCancel}>
      <Container>
        Вы уверены?
        <ButtonsWrap>
          <Cancel onClick={onCancel}>отмена</Cancel>
          <Confirm onClick={onConfirm}>{confirmBtnTitle}</Confirm>
        </ButtonsWrap>
      </Container>
    </Popup>
  );
};

export default observer(ConfirmPopup);

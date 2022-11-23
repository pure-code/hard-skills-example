import { GROUP_COLORS } from "../../../../constants/colors";
import { Stages } from "../../../../types";
import { ReactComponent as StarIcon } from "../../../../assets/star.svg";
import { ReactComponent as InterviewedIcon } from "../../../../assets/interviewed.svg";
import { ReactComponent as InProgressIcon } from "../../../../assets/checkbox.svg";
import { ReactComponent as OfferIcon } from "../../../../assets/offer.svg";

import { ColumnHeadingContainer } from "./styled";

export interface ColumnHeadingProps {
  type: Stages;
  title: string;
  count: number;
}

const ColumnHeading = ({ type, count, title }: ColumnHeadingProps) => {
  const columnIcons = {
    [Stages.new]: <StarIcon />,
    [Stages.inProgress]: <InterviewedIcon />,
    [Stages.interviewed]: <InProgressIcon />,
    [Stages.offer]: <OfferIcon />,
  };
  return (
    <ColumnHeadingContainer color={GROUP_COLORS[type]}>
      {columnIcons[type]}
      {title}
      <span>({count})</span>
    </ColumnHeadingContainer>
  );
};

export default ColumnHeading;

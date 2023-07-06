import { GROUP_COLORS } from "shared/constants/colors";
import { Stages } from "shared/types";
import { ReactComponent as StarIcon } from "shared/ui/icons/star.svg";
import { ReactComponent as InterviewedIcon } from "shared/ui/icons/interviewed.svg";
import { ReactComponent as InProgressIcon } from "shared/ui/icons/checkbox.svg";
import { ReactComponent as OfferIcon } from "shared/ui/icons/offer.svg";

import { ColumnHeadingContainer } from "./styled";

export interface ColumnHeadingProps {
  count: number;
  title: string;
  type: Stages;
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

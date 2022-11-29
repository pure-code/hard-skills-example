import { TagItem, TagsContainer } from "./styled";

export interface TagsProps {
  tags: string;
}

const Tags = ({ tags }: TagsProps) => (
  <TagsContainer>
    {tags.split(",").map((el) => el && <TagItem key={el}>{el}</TagItem>)}
  </TagsContainer>
);

export default Tags;

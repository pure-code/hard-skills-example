export interface AddCandidateProps{
  onCreate: () => void;
}

export enum AddCandidateFieldsNames {
  name = 'name',
  grade = 'grade',
  link = 'link',
  avatar = 'avatar',
  contact = 'contact',
  tags = 'tags',
  comment = 'comment'
}

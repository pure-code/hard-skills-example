import { Candidate } from "shared/types";

export interface AddCandidateFormProps {
  heading: string;
  isEdit: boolean;
  onSubmit: () => void;
}

export type CandidateTypeKeys = keyof Omit<
  Candidate,
  "userId" | "vacancyId" | "_id" | "createdAt"
>;

export const AddCandidateFieldsNames: Record<
  CandidateTypeKeys,
  CandidateTypeKeys
> = {
  name: "name",
  grade: "grade",
  link: "link",
  contact: "contact",
  tags: "tags",
  comment: "comment",
};

import { Vacancy } from "../../../../types";

export interface AddVacancyFormProps {
  onSubmit: () => void;
  isEdit: boolean;
  heading: string;
}

export type VacancyTypeKeys = keyof Pick<Vacancy, "name" | "link">;

export const AddVacancyFieldsNames: Record<VacancyTypeKeys, VacancyTypeKeys> = {
  name: "name",
  link: "link",
};

import { Vacancy } from "shared/types";

export interface AddVacancyFormProps {
  heading: string;
  isEdit: boolean;
  onSubmit: () => void;
}

export type VacancyTypeKeys = keyof Pick<Vacancy, "name" | "link">;

export const AddVacancyFieldsNames: Record<VacancyTypeKeys, VacancyTypeKeys> = {
  name: "name",
  link: "link",
};

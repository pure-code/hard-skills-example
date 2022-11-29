import { Candidate } from "shared/types";
import { FieldItem } from "shared/ui/Field/interfaces";
import { AddCandidateFieldsNames } from "./interfaces";

export const addCandidateFormFields = (candidate: Candidate): FieldItem[] => [
  {
    name: AddCandidateFieldsNames.name,
    placeholder: "Имя",
    required: true,
    initialValue: candidate.name,
  },
  {
    name: AddCandidateFieldsNames.grade,
    placeholder: "Специальность",
    required: true,
    initialValue: candidate.grade,
  },
  {
    name: AddCandidateFieldsNames.link,
    placeholder: "Ссылка на резюме",
    initialValue: candidate.link,
  },
  {
    name: AddCandidateFieldsNames.contact,
    placeholder: "Контакты",
    initialValue: candidate.contact,
  },
  {
    name: AddCandidateFieldsNames.tags,
    placeholder: "Теги через запятую",
    initialValue: candidate.tags,
  },
  {
    type: "textarea",
    name: AddCandidateFieldsNames.comment,
    placeholder: "Комментарий",
    initialValue: candidate.comment,
  },
];

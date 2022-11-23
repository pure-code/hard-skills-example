import { useState } from "react";
import { useStore } from "../../../../hooks/useStore";
import { Candidate } from "../../../../types";
import { initialCandidate } from "../../../../stores/initialData";
import Form from "../../../../components/Form";
import { FieldItem } from "../../../../components/Field/interfaces";
import { AddCandidateFieldsNames, AddCandidateProps } from "./interfaces";

const fields: FieldItem[] = [
  { name: AddCandidateFieldsNames.name, placeholder: "Имя", required: true },
  {
    name: AddCandidateFieldsNames.grade,
    placeholder: "Специальность",
    required: true,
  },
  { name: AddCandidateFieldsNames.link, placeholder: "Ссылка на резюме" },
  { name: AddCandidateFieldsNames.avatar, placeholder: "Ссылка на аватар" },
  { name: AddCandidateFieldsNames.contact, placeholder: "Контакты" },
  { name: AddCandidateFieldsNames.tags, placeholder: "Теги через запятую" },
  {
    type: "textarea",
    name: AddCandidateFieldsNames.comment,
    placeholder: "Комментарий",
  },
];

const AddCandidate = ({ onCreate }: AddCandidateProps) => {
  const {
    jobs: { addCandidate, job },
  } = useStore();
  const [newCandidate, setNewCandidate] = useState<Candidate>(
    initialCandidate(job?.id || "")
  );
  const isError = !newCandidate.name || !newCandidate.grade;

  const handleSetNewCandidate = (type: string, value: string) => {
    setNewCandidate((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleAddCandidate = () => {
    addCandidate(newCandidate);
    onCreate();
  };

  return (
    <Form
      onCreate={handleAddCandidate}
      onChange={handleSetNewCandidate}
      fields={fields}
      heading="Добавить нового кандидата"
      error={isError}
    />
  );
};

export default AddCandidate;

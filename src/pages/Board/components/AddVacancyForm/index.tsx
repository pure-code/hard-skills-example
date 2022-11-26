import { useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";
import { initialVacancyInfo } from "../../../../stores/initialData";
import Form from "../../../../components/Form";
import { ROUTES } from "../../../../constants/routes";
import { AddVacancyFormProps, AddVacancyFieldsNames } from "./interfaces";
import { FieldItem } from "../../../../components/Field/interfaces";
import { Vacancy, VacancyInfo } from "../../../../types";

const fields = (vacancy: Vacancy | VacancyInfo): FieldItem[] => [
  {
    name: AddVacancyFieldsNames.name,
    placeholder: "Название",
    required: true,
    initialValue: vacancy.name,
  },
  {
    name: AddVacancyFieldsNames.link,
    placeholder: "Ссылка на вакансию",
    initialValue: vacancy.link,
  },
];

const AddVacancyForm = ({ onSubmit, isEdit, heading }: AddVacancyFormProps) => {
  const {
    vacancies: { addVacancy, selectedVacancy, updateVacancy },
  } = useStore();
  const [newVacancy, setNewVacancy] = useState(
    isEdit ? selectedVacancy : initialVacancyInfo()
  );
  const isError = !newVacancy.name;
  const navigate = useNavigate();

  const handleSetNewVacancy = (type: string, value: string) => {
    setNewVacancy((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleOnSubmit = () => {
    if (isEdit) {
      updateVacancy(newVacancy as VacancyInfo).then(() => {
        onSubmit();
      });
    } else {
      addVacancy(newVacancy as VacancyInfo).then((res) => {
        onSubmit();
        navigate(`${ROUTES.BOARD}/${res._id}`);
      });
    }
  };

  return (
    <Form
      error={isError}
      onSubmit={handleOnSubmit}
      onChange={handleSetNewVacancy}
      fields={fields(newVacancy)}
      heading={heading}
    />
  );
};

export default observer(AddVacancyForm);

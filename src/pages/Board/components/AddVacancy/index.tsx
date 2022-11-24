import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../../../../hooks/useStore";
import { Vacancy } from "../../../../types";
import { initialVacancy } from "../../../../stores/initialData";
import Form from "../../../../components/Form";
import { ROUTES } from "../../../../constants/routes";
import { AddVacancyFieldsNames, AddVacancyProps } from "./interfaces";
import { FieldItem } from "../../../../components/Field/interfaces";

const fields: FieldItem[] = [
  { name: AddVacancyFieldsNames.name, placeholder: "Название", required: true },
  {
    name: AddVacancyFieldsNames.link,
    placeholder: "Ссылка на вакансию",
  },
];

const AddVacancy = ({ onCreate }: AddVacancyProps) => {
  const {
    vacancies: { addVacancy },
  } = useStore();
  const [newVacancy, setNewVacancy] = useState<Vacancy>(initialVacancy());
  const isError = !newVacancy.name;
  const navigate = useNavigate();

  const handleSetNewVacancy = (type: string, value: string) => {
    setNewVacancy((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleAddVacancy = () => {
    addVacancy(newVacancy).then((res) => {
      onCreate();
      navigate(`${ROUTES.BOARD}/${res._id}`);
    });
  };

  return (
    <Form
      error={isError}
      onCreate={handleAddVacancy}
      onChange={handleSetNewVacancy}
      fields={fields}
      heading="Добавить новую вакансию"
    />
  );
};

export default AddVacancy;

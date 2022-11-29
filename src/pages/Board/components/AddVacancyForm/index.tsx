import { useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { useStore } from "shared/lib/useStore";
import { initialVacancyInfo } from "shared/stores/initialData";
import Form from "shared/ui/Form";
import { ROUTES } from "shared/constants/routes";
import { FieldItem } from "shared/ui/Field/interfaces";
import { Vacancy, VacancyInfo } from "shared/types";
import { AddVacancyFormProps, AddVacancyFieldsNames } from "./interfaces";

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
    notification: { pushToNotificationsList },
  } = useStore();
  const [newVacancy, setNewVacancy] = useState(
    isEdit ? selectedVacancy : initialVacancyInfo()
  );
  const isError = !newVacancy.name;
  const isChangedValue =
    isEdit && JSON.stringify(selectedVacancy) !== JSON.stringify(newVacancy);
  const navigate = useNavigate();

  const handleSetNewVacancy = (type: string, value: string) => {
    setNewVacancy((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleOnSubmit = () => {
    if (isEdit) {
      updateVacancy(newVacancy as VacancyInfo).then(() => {
        onSubmit();
        pushToNotificationsList({
          description: "Вакансия успешно обновлена",
        });
      });
    } else {
      addVacancy(newVacancy as VacancyInfo).then((res) => {
        onSubmit();
        navigate(`${ROUTES.BOARD}/${res._id}`);
        pushToNotificationsList({
          description: "Вакансия успешно добавлена",
        });
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
      isEdit={isEdit}
      disableSubmit={isEdit && !isChangedValue}
    />
  );
};

export default observer(AddVacancyForm);

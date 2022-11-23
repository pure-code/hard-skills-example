import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../../../../hooks/useStore";
import { Job } from "../../../../types";
import { initialJob } from "../../../../stores/initialData";
import Form from "../../../../components/Form";
import { ROUTES } from "../../../../constants/routes";
import { AddJobFieldsNames, AddJobProps } from "./interfaces";
import { FieldItem } from "../../../../components/Field/interfaces";

const fields: FieldItem[] = [
  { name: AddJobFieldsNames.name, placeholder: "Название", required: true },
  { name: AddJobFieldsNames.company, placeholder: "Компания", required: true },
];

const AddJob = ({ onCreate }: AddJobProps) => {
  const {
    jobs: { addJob },
  } = useStore();
  const [newJob, setNewJob] = useState<Job>(initialJob());
  const isError = !newJob.name || !newJob.company;
  const navigate = useNavigate();

  const handleSetNewJob = (type: string, value: string) => {
    setNewJob((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleAddJob = () => {
    addJob(newJob);
    onCreate();
    navigate(`${ROUTES.BOARD}/${newJob.id}`);
  };

  return (
    <Form
      error={isError}
      onCreate={handleAddJob}
      onChange={handleSetNewJob}
      fields={fields}
      heading="Добавить новую вакансию"
    />
  );
};

export default AddJob;

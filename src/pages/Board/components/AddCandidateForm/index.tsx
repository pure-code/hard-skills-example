import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../hooks/useStore";
import { Candidate } from "../../../../types";
import { initialCandidate } from "../../../../stores/initialData";
import Form from "../../../../components/Form";
import { AddCandidateFormProps } from "./interfaces";
import { addCandidateFormFields } from "./initialData";

const AddCandidateForm = ({
  onSubmit,
  isEdit,
  heading,
}: AddCandidateFormProps) => {
  const {
    vacancies: { selectedVacancy },
    candidates: { addCandidate, updateCandidate, selectedCandidate },
  } = useStore();
  const [newCandidate, setNewCandidate] = useState<Candidate>(
    selectedCandidate || initialCandidate(selectedVacancy._id)
  );
  const isError = !newCandidate.name || !newCandidate.grade;

  const handleSetNewCandidate = (type: string, value: string) => {
    setNewCandidate((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleAddCandidate = () => {
    const actionOnCandidate = isEdit ? updateCandidate : addCandidate;
    actionOnCandidate(newCandidate);
    onSubmit();
  };

  return (
    <Form
      onSubmit={handleAddCandidate}
      onChange={handleSetNewCandidate}
      fields={addCandidateFormFields(newCandidate)}
      heading={heading}
      error={isError}
    />
  );
};

export default observer(AddCandidateForm);

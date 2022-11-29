import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "shared/lib/useStore";
import { Candidate } from "shared/types";
import { initialCandidate } from "shared/stores/initialData";
import Form from "shared/ui/Form";
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
    notification: { pushToNotificationsList },
  } = useStore();
  const [newCandidate, setNewCandidate] = useState<Candidate>(
    selectedCandidate || initialCandidate(selectedVacancy._id)
  );
  const isError = !newCandidate.name || !newCandidate.grade;

  const isChangedValue =
    isEdit &&
    JSON.stringify(selectedCandidate) !== JSON.stringify(newCandidate);

  const handleSetNewCandidate = (type: string, value: string) => {
    setNewCandidate((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleAddCandidate = () => {
    const actionOnCandidate = isEdit ? updateCandidate : addCandidate;
    actionOnCandidate(newCandidate);
    pushToNotificationsList({
      description: isEdit
        ? "Кандидат успешно обновлён"
        : "Кандидат успешно добавлен",
    });
    onSubmit();
  };

  return (
    <Form
      onSubmit={handleAddCandidate}
      onChange={handleSetNewCandidate}
      fields={addCandidateFormFields(newCandidate)}
      heading={heading}
      error={isError}
      isEdit={isEdit}
      disableSubmit={isEdit && !isChangedValue}
    />
  );
};

export default observer(AddCandidateForm);

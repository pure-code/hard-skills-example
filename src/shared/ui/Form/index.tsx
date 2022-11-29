import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Field from "shared/ui/Field";
import { FormProps } from "./interfaces";

import { FormContainer, AddBtn, Heading } from "./styled";

const Form = ({
  onSubmit,
  onChange,
  fields,
  heading,
  error,
  isEdit,
  disableSubmit,
}: FormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isDisabledSubmit = disableSubmit || (error && isSubmitted);
  const handleOnSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (error) {
      setIsSubmitted(true);
      return;
    }
    onSubmit();
  };

  const handleOnChange = (ev: ChangeEvent<HTMLFormElement>) => {
    const { name, value } = ev.target;
    onChange(name, value);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <FormContainer onChange={handleOnChange} onSubmit={handleOnSubmit}>
      <Heading>{heading}</Heading>
      {fields.map(({ type, name, placeholder, required, initialValue }) => (
        <Field
          key={name}
          type={type}
          name={name}
          placeholder={placeholder}
          error={error && isSubmitted}
          initialValue={initialValue}
          required={required}
        />
      ))}
      <AddBtn data-testid="submitBtn" type="submit" disabled={isDisabledSubmit}>
        {isEdit ? "Обновить" : "Добавить"}
      </AddBtn>
    </FormContainer>
  );
};

export default Form;

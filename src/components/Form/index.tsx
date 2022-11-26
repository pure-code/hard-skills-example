import { FormEvent, useEffect, useState } from "react";
import Field from "../Field";
import { FormProps } from "./interfaces";

import { FormContainer, AddBtn, Heading } from "./styled";

const Form = ({ onSubmit, onChange, fields, heading, error }: FormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOnSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (error) {
      setIsSubmitted(true);
      return;
    }
    onSubmit();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <FormContainer onSubmit={handleOnSubmit}>
      <Heading>{heading}</Heading>
      {fields.map(({ type, name, placeholder, required, initialValue }) => (
        <Field
          key={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          error={error && isSubmitted}
          initialValue={initialValue}
          required={required}
        />
      ))}
      <AddBtn disabled={error && isSubmitted}>Добавить</AddBtn>
    </FormContainer>
  );
};

export default Form;

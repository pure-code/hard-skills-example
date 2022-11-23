import { useEffect, useState } from 'react';
import Field from '../Field';
import { FormProps } from './interfaces';

import {
  FormContainer, AddBtn, Heading,
} from './styled';

const Form = ({
  onCreate, onChange, fields, heading, error,
}: FormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOnCreate = () => {
    if (error) {
      setIsSubmitted(true);
      return;
    }
    onCreate();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <FormContainer>
      <Heading>{heading}</Heading>
      {fields.map(({
        type, name, placeholder, required,
      }) => (
        <Field
          key={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          error={error && isSubmitted}
          required={required}
        />
      ))}
      <AddBtn disabled={error && isSubmitted} onClick={handleOnCreate}>Добавить</AddBtn>
    </FormContainer>
  );
};

export default Form;

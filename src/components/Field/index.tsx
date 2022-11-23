import { ChangeEvent, useState } from 'react';
import { FieldProps } from './interfaces';

import {
  FieldContainer, CommentField,
} from './styled';

const Field = ({
  onChange, placeholder, initialValue, type, name, required, error,
}: FieldProps) => {
  const [fieldValue, setFieldValue] = useState(initialValue || '');

  const handleSetFieldValue = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = ev.target;
    setFieldValue(value);
    onChange(name, value);
  };

  if (type === 'textarea') {
    return (
      <CommentField
        error={!!error && !!required && !fieldValue}
        placeholder={placeholder}
        onChange={handleSetFieldValue}
        value={fieldValue}
      />
    );
  }

  return (
    <FieldContainer
      error={!!error && !!required && !fieldValue}
      placeholder={placeholder}
      onChange={handleSetFieldValue}
      value={fieldValue}
    />
  );
};

export default Field;

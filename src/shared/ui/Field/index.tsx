import { ChangeEvent, useEffect, useState } from "react";
import { FieldProps } from "./interfaces";

import { FieldContainer, CommentField } from "./styled";

const Field = ({
  placeholder,
  initialValue,
  type,
  name,
  required,
  error,
}: FieldProps) => {
  const [fieldValue, setFieldValue] = useState(initialValue || "");

  const handleSetFieldValue = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = ev.target;
    setFieldValue(value);
  };

  const elementProps = {
    "data-testid": "inputField",
    name,
    error: !!error && !!required && !fieldValue,
    placeholder,
    onChange: handleSetFieldValue,
    value: fieldValue,
  };

  if (type === "textarea") {
    return <CommentField {...elementProps} />;
  }

  useEffect(() => {
    if (initialValue) {
      setFieldValue(initialValue);
    }
  }, [initialValue]);

  return <FieldContainer {...elementProps} />;
};

export default Field;

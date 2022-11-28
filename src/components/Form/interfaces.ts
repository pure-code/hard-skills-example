import { FieldItem } from "../Field/interfaces";

export interface FormProps {
  heading: string;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
  fields: FieldItem[];
  error: boolean;
  isEdit?: boolean;
}

export interface FieldItem {
  name: string;
  placeholder: string;
  initialValue?: string;
  type?: "textarea" | "";
  required?: boolean;
}

export interface FieldProps extends FieldItem {
  onChange: (name: string, value: string) => void;
  error?: boolean;
}

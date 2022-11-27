export interface FieldItem {
  name: string;
  placeholder: string;
  initialValue?: string;
  type?: "textarea" | "";
  required?: boolean;
}

export interface FieldProps extends FieldItem {
  error?: boolean;
}

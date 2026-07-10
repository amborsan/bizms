type FormField = {
  name: string;
  state: {
    meta: {
      errors: Array<unknown>;
      isTouched: boolean;
    };
    value: string;
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
};

type InputProps = {
  className?: string;
  field: FormField;
  placeholder?: string;
  type?: string;
};

function Input({
  className = "",
  field,
  placeholder,
  type = "text",
}: InputProps) {
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  return (
    <input
      id={field.name}
      name={field.name}
      type={type}
      className={`input input-bordered w-full ${
        hasError ? "input-error" : ""
      } ${className}`}
      placeholder={placeholder}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  );
}
export default Input;

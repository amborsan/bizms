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

type SelectOption = {
  label: string;
  value: string;
};

type SelectInputProps = {
  className?: string;
  field: FormField;
  options: Array<SelectOption | string>;
  placeholder?: string;
};

function SelectInput({
  className = "",
  field,
  options,
  placeholder,
}: SelectInputProps) {
  const hasError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0;

  return (
    <select
      id={field.name}
      name={field.name}
      className={`select select-bordered w-full ${
        hasError ? "select-error" : ""
      } ${className}`}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    >
      {placeholder && (
        <option disabled value="">
          {placeholder}
        </option>
      )}
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;

        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

export default SelectInput;

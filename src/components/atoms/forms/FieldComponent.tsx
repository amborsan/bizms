import type { ReactNode } from "react";

type FieldRenderProps = {
  name: string;
  state: {
    meta: {
      errors: Array<{ message?: string } | string>;
      isTouched: boolean;
    };
    value: string;
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
};

type FieldComponentProps = {
  children: (field: FieldRenderProps) => ReactNode;
  className?: string;
  form: any;
  label: string;
  name: string;
};

function FieldComponent({
  children,
  className = "",
  form,
  label,
  name,
}: FieldComponentProps) {
  return (
    <form.Field name={name}>
      {(field: FieldRenderProps) => {
        const firstError = field.state.meta.errors[0];
        const errorMessage =
          typeof firstError === "string" ? firstError : firstError?.message;
        const showError = field.state.meta.isTouched && errorMessage;

        return (
          <div className={`form-control w-full ${className}`}>
            <label htmlFor={field.name} className="label">
              <span className="label-text">{label}</span>
            </label>
            {children(field)}
            {showError && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errorMessage}
                </span>
              </label>
            )}
          </div>
        );
      }}
    </form.Field>
  );
}

export default FieldComponent;

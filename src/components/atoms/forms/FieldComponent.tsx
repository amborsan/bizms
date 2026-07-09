import { useForm, Field } from "@tanstack/react-form";

function FieldComponent({ children, form, name }) {
  return (
    <form.Field name={name} className={fieldClasses}>
      {(field) => {
        //   console.log('Field', field)
        return <>{children}</>;
      }}
    </form.Field>
  );
}

export default FieldComponent;

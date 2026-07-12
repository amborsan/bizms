import { useForm } from "@tanstack/react-form";
import Button from "../button/Button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import FieldComponent from "./FieldComponent";
import Input from "./Input";
import { useToast } from "../../../context/ToastContext";

import type {
  Customer,
  CustomerFormValues,
} from "../../../pages/customers/customer.types";

const customerSchema = z.object({
  Title: z.string().min(2, "Company title is required"),
  address: z.string().min(2, "Address is required"),
  contatctperson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Please enter a valid email"),
  phonenumber: z.string().min(4, "Phone number is required"),
});

type CustomerFormProps = {
  initialValues?: Customer;
  mode?: "create" | "edit";
  onSuccess: (customer: Customer) => void;
};

function CreateCustommerForm({
  initialValues,
  mode = "create",
  onSuccess,
}: CustomerFormProps) {
  const { showToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (customerValues: CustomerFormValues) => {
      if (mode === "edit" && initialValues?.id) {
        const { data } = await axios.put<Customer>(
          `http://localhost:3001/customers/${initialValues.id}`,
          {
            ...customerValues,
            id: initialValues.id,
          },
        );

        return data;
      }

      const { data } = await axios.post<Customer>(
        "http://localhost:3001/customers",
        customerValues,
      );

      return data;
    },
    onSuccess: (customer) => {
      showToast(
        mode === "edit"
          ? "Customer updated successfully."
          : "Customer created successfully.",
        { type: "success" },
      );
      onSuccess(customer);
    },
    onError: () => {
      showToast("Customer could not be saved.", { type: "error" });
    },
  });

  const defaultValues: CustomerFormValues = {
    Title: initialValues?.Title ?? "",
    address: initialValues?.address ?? "",
    contatctperson: initialValues?.contatctperson ?? "",
    email: initialValues?.email ?? "",
    phonenumber: initialValues?.phonenumber ?? "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: customerSchema,
      onSubmit: customerSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(customerSchema.parse(value));
    },
  });

  return (
    <div className="card w-full max-w-2xl border border-base-300 bg-base-100 shadow-sm text-base-content">
      <form
        className="card-body gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldComponent
            className="sm:col-span-2"
            form={form}
            label="Company title"
            name="Title"
          >
            {(field) => <Input field={field} />}
          </FieldComponent>

          <FieldComponent
            className="sm:col-span-2"
            form={form}
            label="Address"
            name="address"
          >
            {(field) => <Input field={field} />}
          </FieldComponent>

          <FieldComponent
            form={form}
            label="Contact person"
            name="contatctperson"
          >
            {(field) => <Input field={field} />}
          </FieldComponent>

          <FieldComponent form={form} label="Email" name="email">
            {(field) => <Input field={field} type="email" />}
          </FieldComponent>

          <FieldComponent form={form} label="Phone number" name="phonenumber">
            {(field) => <Input field={field} type="tel" />}
          </FieldComponent>
        </div>

        <div className="card-actions justify-end pt-2">
          <Button type="submit" loading={mutation.isPending}>
            {mode === "edit" ? "Save changes" : "Create customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateCustommerForm;

import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Button from "../../components/atoms/Button/Button";
import FieldComponent from "../../components/atoms/forms/FieldComponent";
import Input from "../../components/atoms/forms/Input";
import type { Customer, CustomerFormValues } from "./customer.types";

const customerSchema = z.object({
  Title: z.string().min(2, "Company title is required"),
  address: z.string().min(2, "Address is required"),
  contatctperson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Please enter a valid email"),
  phonenumber: z.string().min(4, "Phone number is required"),
});

type CustomerFormProps = {
  customer: Customer;
  onSuccess: (customer: Customer) => void;
};

function CustomerForm({ customer, onSuccess }: CustomerFormProps) {
  const mutation = useMutation({
    mutationFn: async (customerValues: CustomerFormValues) => {
      const { data } = await axios.put<Customer>(
        `http://localhost:3001/customers/${customer.id}`,
        {
          ...customerValues,
          id: customer.id,
        },
      );

      return data;
    },
    onSuccess: (updatedCustomer) => {
      onSuccess(updatedCustomer);
    },
  });

  const form = useForm({
    defaultValues: {
      Title: customer.Title,
      address: customer.address,
      contatctperson: customer.contatctperson,
      email: customer.email,
      phonenumber: customer.phonenumber,
    },
    validators: {
      onChange: customerSchema,
      onSubmit: customerSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(customerSchema.parse(value));
    },
  });

  return (
    <div className="card w-full max-w-2xl border border-base-300 bg-base-100 shadow-sm">
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

        <div className="card-actions justify-end">
          <Button type="submit" loading={mutation.isPending}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;

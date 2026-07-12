import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { z } from "zod";
import type { Customer, CustomerFormValues } from "./customer.types";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/atoms/button/Button";

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
  const { showToast } = useToast();
  const [formData, setFormData] = useState<CustomerFormValues>({
    Title: customer.Title,
    address: customer.address,
    contatctperson: customer.contatctperson,
    email: customer.email,
    phonenumber: customer.phonenumber,
  });
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = customerSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");

    try {
      const { data } = await axios.put<Customer>(
        `http://localhost:3001/customers/${customer.id}`,
        {
          ...result.data,
          id: customer.id,
        },
      );

      showToast("Customer updated successfully.", { type: "success" });
      onSuccess(data);
    } catch {
      showToast("Customer could not be saved.", { type: "error" });
      setError("Customer could not be saved.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card w-full max-w-2xl border border-base-300 bg-base-100 shadow-sm"
    >
      <div className="card-body gap-4">
        {error && <div className="alert alert-error">{error}</div>}

        <label className="form-control w-full">
          <span className="label-text mb-1">Company title</span>
          <input
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Address</span>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Contact person</span>
          <input
            name="contatctperson"
            value={formData.contatctperson}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Email</span>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1">Phone number</span>
          <input
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </label>

        <div className="card-actions justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </div>
    </form>
  );
}

export default CustomerForm;

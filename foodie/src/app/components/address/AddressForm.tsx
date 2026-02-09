"use client";

import { useState, useEffect } from "react";
import Input from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { addAddress, updateAddress, Address } from "@/app/lib/address";
import { useAuth } from "@/app/context/AuthProvider";

export default function AddressForm({
  address,
  onSuccess,
  onCancel,
}: {
  address: Address | null;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const { token } = useAuth();

  const [form, setForm] = useState({
    house: "",
    area: "",
    landmark: "",
  });

  useEffect(() => {
    if (address) {
      setForm({
        house: address.house,
        area: address.area,
        landmark: address.landmark || "",
      });
    }
  }, [address]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (address) {
      await updateAddress(address._id, form, token!);
    } else {
      await addAddress(form, token!);
    }

    onSuccess();
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h3 className="font-bold mb-3">
        {address ? "Edit Address" : "Add New Address"}
      </h3>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input label="House / Flat" name="house" value={form.house}
          onChange={(e) => setForm({ ...form, house: e.target.value })} />

        <Input label="Area" name="area" value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })} />

        <Input label="Landmark" name="landmark" value={form.landmark}
          onChange={(e) => setForm({ ...form, landmark: e.target.value })} />

        <div className="flex gap-3">
          <Button type="submit" variant="primary">Save</Button>
          <button type="button" onClick={onCancel} className="text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

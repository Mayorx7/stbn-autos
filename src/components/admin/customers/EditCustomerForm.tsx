"use client";
import React, { useTransition } from "react";
// TODO: Integrate with Supabase for customer data
// import {
//   editCustomerSchema,
//   type EditCustomerType,
// } from "@/app/schemas/customer.schema";
import { CustomerStatus } from "@/config/constants";
import type { MockCustomer } from "@/config/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { updateCustomerAction } from "@/app/_actions/customer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { formatCustomerStatus } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const EditCustomerForm = ({ customer }: { customer: MockCustomer }) => {
  // TODO: Integrate with Supabase for customer data
  // const form = useForm<EditCustomerType>({
  //   resolver: zodResolver(editCustomerSchema),
  //   defaultValues: {
  //     status: customer.status,
  //   },
  // });
  // const [isPending, startTransition] = useTransition();

  // const onSubmit: SubmitHandler<EditCustomerType> = async (data) => {
  //   startTransition(async () => {
  //     const response = await updateCustomerAction({
  //       id: customer.id,
  //       status: data.status,
  //     });
  //     if (response.success) {
  //       toast.success("Customer status updated successfully", {
  //         description: response.message,
  //         duration: 3000,
  //       });
  //     } else {
  //       toast.error("Error updating customer status", {
  //         description: response.message,
  //         duration: 3000,
  //       });
  //     }
  //   });
  // };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#53657A]">
        TODO: Integrate with Supabase for customer data
      </h1>
      <p className="text-[#53657A]">
        Customer form is disabled until Supabase integration is complete.
      </p>
    </div>
  );
};

export default EditCustomerForm;

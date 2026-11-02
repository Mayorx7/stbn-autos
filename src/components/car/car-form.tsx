"use client";
// TODO: Integrate with Supabase for car data
// import { updateCarSchema, UpdateCarType } from "@/app/schemas/car.schema";
import { CarWithImages } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarStatus, CurrencyCode } from "@/config/constants";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../ui/form";
// import { updateCarAction } from "@/app/_actions/car";
import { toast } from "sonner";
import CarFormField from "./car-form-fields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { formatCarStatus } from "@/lib/utils";
import MultiImageUploader from "./mutil-image-uploader";
interface CarFormProps {
  car: CarWithImages;
}

function extractKey(url: string) {
  const nextUrl = new URL(url);
  nextUrl.href = url;
  const regex = /upload\/.+/;
  const match = url.match(regex);

  return match ? match[0] : url;
}
const CarForm = ({ car }: CarFormProps) => {
  const [isPending, startTransition] = useTransition();

  // TODO: Integrate with Supabase for car data
  // const form = useForm<UpdateCarType>({
  //   resolver: zodResolver(updateCarSchema),
  //   defaultValues: {
  //     id: car.id,
  //     odoUnit: car.odoUnit,
  //     currency: CurrencyCode.NGN,
  //     ...(car && {
  //       images: car.images
  //         ? car.images.map((image, index) => ({
  //             ...image,
  //             id: index + 1,
  //             percentage: 100,
  //             key: extractKey(image.src),
  //             done: true,
  //           }))
  //         : [],
  //       make: car.make?.id?.toString() ?? "",
  //       model: "",
  //       modelVariant: "",
  //       year: car.year.toString(),
  //       vrm: car.vrm ?? "",
  //       description: car.description ?? "",
  //       fuelType: car.fuelType,
  //       bodyType: car.bodyType,
  //       transmission: car.transmission,
  //       colour: car.colour,
  //       ulezCompliance: "COMPLIANT",
  //       status: car.status,
  //       odoReading: car.odoReading,
  //       seats: car.seats,
  //       doors: car.doors,
  //       price: car.price,
  //     }),
  //   },
  // });

  // const carformSubmit: SubmitHandler<UpdateCarType> = async (data) => {
  //   startTransition(async () => {
  //     const { success, message } = await updateCarAction(data);
  //     if (!success) {
  //       toast.error("Error updating this car", {
  //         description: message,
  //         duration: 2500,
  //       });
  //     }
  //   });
  // };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#53657A]">
        TODO: Integrate with Supabase for car data
      </h1>
      <p className="text-[#53657A]">
        Car form is disabled until Supabase integration is complete.
      </p>
    </div>
  );
};

export default CarForm;

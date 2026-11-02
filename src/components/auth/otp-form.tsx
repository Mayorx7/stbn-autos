"use client";
// TODO: Integrate with Supabase for auth
// import { OTPSchema, OTPSchemaType } from "@/app/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import OTPInput from "./otp-input";
import { Button } from "../ui/button";
import { Loader2, RotateCw } from "lucide-react";
// import { completeChallengeAction, resendChallengeAction } from "@/app/_actions/challenge";
import { toast } from "sonner";

const OtpForm = () => {
  const [isCodePending, startCodeTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();
    const [sendButtontext, setSendButtontext] = useState("Send Code");


  const router = useRouter();
  // TODO: Integrate with Supabase for auth
  // const form = useForm<OTPSchemaType>({
  //   resolver: zodResolver(OTPSchema),
  // });
  // const onSubmit: SubmitHandler<OTPSchemaType> = async (data) => {
  //   startSubmitTransition(async () => {
  //     // complete OTP action
  //     const result =  await completeChallengeAction(data.code);
  //     console.log("OTP result", result);
  //     if (!result?.success) {
  //       toast.error("Error completing OTP", {
  //         description: result.message,
  //       });
  //       return;
  //     } else {
  //       console.log("OTP completed successfully");
  //     }
  //   })
  // };
  // const sendCode = async () => {
  //   startCodeTransition(async () => {
  //     // Simulate sending code

  //     const {
  //       success, message
  //     } = await resendChallengeAction ();
  //     // Here you would typically call an API to send the OTP code
  //     setSendButtontext("Resend code");
  //     if (!success) {
  //       toast.error("Eror sending code",{
  //         description: message,
  //       });
  //     }
  //     toast.success("Code sent successfully", {
  //       description: "Please check your email for the code.",
  //     })
  //   });
  // }

  useEffect(() => {
    if (isCodePending) {
      setSendButtontext("Sending...");
    }
  },[])
  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex w-full flex-1 justify-center
  px-6 pt-10 lg:items-center lg:pt-0"
    >
      <div className="flex w-full max-w-lg flex-col">
        <h3 className="mb-4 text-4xl md:text-5xl text-center">
          One time password
        </h3>
        <p className="mb-12 text-center text-[#53657A] ">
          TODO: Integrate with Supabase for auth
        </p>
      </div>
    </div>
  );
};

export default OtpForm;

"use client";
import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FormTemplate() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
    reset,
  } = useForm<FormInput>();

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("60");
  const [notification, setNotification] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    const maxLength = 12;

    if (!value.startsWith("60")) {
      value = "60" + value.substring(0, maxLength - 2);
    }

    value = value.substring(0, maxLength);

    setPhoneNumber(value);
    if (errors.number) {
      clearErrors("number");
    }
  };

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmitForm = async (formData: FormInput) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      setNotification(
        "Execute recaptcha not available yet, likely meaning key not recaptcha key not set"
      );
      return;
    }

    setSubmitting(true);

    try {
      const gReCaptchaToken = await executeRecaptcha("enquiryFormSubmit");

      const response = await axios.post("/api/send", {
        ...formData,
        gRecaptchaToken: gReCaptchaToken,
      });

      if (response?.data?.success === true) {
        alert("Success!");
        setNotification(`Success with score: ${response?.data?.score}`);
        setPhoneNumber("60");
        reset();
      } else {
        setNotification(`Failure with score: ${response?.data?.score}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification("Error submitting form");
    }

    setSubmitting(false);
  };

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>Get In Touch</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
        <CardContent>
          <div className="grid w-full items-center gap-5">
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="name">
                Full Name{" "}
                <span className="text-[10px]">- Your full name as per IC.</span>
              </Label>
              <Input
                id="name"
                placeholder="Muhammad Bin Abdullah"
                type="text"
                {...register("name", { required: true })}
                className="capitalize"
                autoComplete="on"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  Full name is required
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                type="email"
                {...register("email", { required: true })}
                autoComplete="on"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">Email is required</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                placeholder="Your phone number"
                {...register("number", {
                  required: true,
                  pattern: /^(60)[0-9]{9,10}$/,
                })}
                value={phoneNumber}
                onChange={handleChange}
              />
              {errors.number && (
                <span className="text-red-500 text-xs">
                  Invalid phone number
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="company">Company Apply</Label>
              <Input
                id="company"
                placeholder="E.g. Todak Academy"
                type="text"
                {...register("company", { required: true })}
                className="capitalize"
                autoComplete="on"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  Company is required
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="position">Position Apply</Label>
              <Input
                id="position"
                placeholder="E.g. Digital Marketer"
                type="text"
                {...register("position", { required: true })}
                className="capitalize"
                autoComplete="on"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  Position is required
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                placeholder="https://www.linkedin.com/"
                type="text"
                {...register("linkedin", { required: true })}
                autoComplete="on"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  LinkedIn url is required
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message"
                {...register("message", { required: false })}
              />
              {errors.message && (
                <span className="text-red-500 text-xs">
                  Message is required
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center items-start gap-5 mt-[2rem]">
          <Button disabled={isSubmitting} type="submit">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
            By submitting the form, you agree to our{" "}
            <span className="underline hover:text-foreground">
              <Link href={"/pdpa-notice"}>PDPA Notice</Link>
            </span>{" "}
            acknowledge and our{" "}
            <span className="underline hover:text-foreground">
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
            </span>
          </p>
        </CardFooter>
      </form>
      {notification && <p className="text-sm text-red-500">{notification}</p>}
    </Card>
  );
}

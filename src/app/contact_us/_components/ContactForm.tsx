"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { sendEmail } from "@/actions/sendEmail";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

export const ContactForm = () => {
  const [success, setSuccess] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!name || !email || !message)
      return toast.error("Please fill up all the fields.");

    setIsLoading(true);

    const res = await sendEmail({ name, email, message });

    if (res.success) {
      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
    } else
      toast.error("We could not recieve your message. Please try again later.");

    setIsLoading(false);
  };

  return (
    <>
      <article className="w-full flex flex-col gap-8 max-w-2xl z-50 relative bg-white p-10 rounded-l-xl">
        <h1 className="text-2xl md:text-3xl font-brand text-center font-medium text-gray-800">
          Contact Us
        </h1>

        <form className="flex flex-col gap-4">
          <Input
            value={name}
            className="border-primary/40"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            value={email}
            className="border-primary/40"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Textarea
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message For Us "
            className=" resize-none h-36 border-primary/40"
            value={message}
          />

          <Button
            type="submit"
            size={"lg"}
            onClick={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="mt-4 bg-gradient-to-br from-primary to-primary w-full"
          >
            Send Message{" "}
            {isLoading && <Loader2 className="ml-4 w-4 h-4 animate-spin" />}
          </Button>
        </form>
      </article>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="flex flex-col gap-8">
          <div className="w-full flex justify-center">
            <FaEnvelopeCircleCheck className="w-12 h-12 text-primary" />
          </div>

          <h2 className="text-3xl font-[550] font-brand text-center text-gray-900">
            We have recieved your message.
          </h2>

          <p className="mb-8">
            Our team will soon contact you on your provided email, please be
            patient.
          </p>

          <DialogClose asChild>
            <Button size={"lg"}>Continue</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

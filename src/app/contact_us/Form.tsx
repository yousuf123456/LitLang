import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { m, LazyMotion } from "framer-motion";
import { Highlight } from "@/components/Highlight";
import { sendEmail } from "@/actions/sendEmail";
import { toast } from "sonner";

const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!name || !email || !message)
      return toast.error("Please fill up all the fields.");

    const res = await sendEmail({ name, email, message });
    if (res.success) {
      setName("");
      setEmail("");
      setMessage("");
      toast.success("We have recieved your message");
    } else
      toast.error("We could not recieve your message. Please try again later.");
  };

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.article
        // animate={{
        //   opacity: [0, 0.2, 0.3, 1],
        //   left: 0,
        // }}
        // initial={{ left: 220, opacity: 0 }}
        // transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col gap-8 max-w-2xl lg:max-w-xl z-50 relative"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          <Highlight className="min-w-64">Anytime, Anywhere</Highlight> —your
          support team.
        </h1>

        <form className="flex flex-col gap-4 lg:pr-12">
          <Input
            value={name}
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            value={email}
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Textarea
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message For Us"
            className=" resize-none h-36"
            value={message}
          />

          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="mt-4 from-gray-900 bg-gradient-to-br to-primary hover:bg-gray-900/90 w-fit"
          >
            Send Message
          </Button>
        </form>
      </m.article>
    </LazyMotion>
  );
};

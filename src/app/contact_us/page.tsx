import React from "react";

import Image from "next/image";

import { FiSend, FiPhoneCall } from "react-icons/fi";
import { HeroImage } from "../(landingPage)/_components/HeroImage";
import { PaddingTopWrapper } from "@/components/PaddingTopWrapper";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ContactForm } from "./_components/ContactForm";

export default function ContactUsPage() {
  return (
    <div className="relative min-h-screen w-full overlay-image flex justify-center">
      <HeroImage
        images={{
          desktop: "/desktop_contact.jpg",
          mobiles: "/mobiles_contact.jpg",
        }}
      />

      <div className="absolute inset-0 bg-black/80" aria-hidden />

      <PaddingTopWrapper
        as="section"
        className="w-full mt-12 mb-20 px-5 md:px-8 lg:px-12"
      >
        <MaxWidthWrapper className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 ">
          <ContactForm />

          <div className="w-full h-[420px] md:h-full relative max-md:rounded-b-xl md:rounded-r-xl overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90 z-10"
              aria-hidden
            />

            <Image
              src={"/mobiles_contact.jpg"}
              className="object-cover"
              alt="Contact Image"
              aria-hidden
              fill
            />

            <div className="absolute bottom-8 right-8 flex flex-col items-end gap-8 z-20">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-0 w-40">
                  <p className="font-medium max-lg:text-sm text-themeSecondary">
                    Email us today
                  </p>
                  <p className=" text-themeSecondary">litlang58@gmail.com</p>
                </div>

                <div
                  className="p-3 rounded-lg border border-themeSecondary/30 flex-shrink-0"
                  aria-hidden
                >
                  <FiSend className="w-4 h-4 text-themeSecondary" />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-0 w-40">
                  <p className="font-medium max-lg:text-sm text-themeSecondary">
                    Call us today
                  </p>
                  <p className=" text-themeSecondary">+923183920797</p>
                </div>

                <div
                  className="p-3 rounded-lg border border-themeSecondary/30 flex-shrink-0"
                  aria-hidden
                >
                  <FiPhoneCall className="w-4 h-4 text-themeSecondary" />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </PaddingTopWrapper>
    </div>
  );
}

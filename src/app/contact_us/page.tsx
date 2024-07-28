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

      <div className=" absolute inset-0 bg-black/80" />

      <PaddingTopWrapper className="w-full mt-20 mb-28 px-12">
        <MaxWidthWrapper className="w-full grid grid-cols-2 gap-0 ">
          <ContactForm />

          <div className="w-full h-full relative rounded-r-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black z-10" />

            <Image
              src={"/mobiles_contact.jpg"}
              alt=""
              fill
              className="object-cover"
            />

            <div className="absolute bottom-4 inset-x-4 flex justify-around z-20">
              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-lg border border-themeSecondary/30">
                  <FiSend className="w-4 h-4 text-themeSecondary" />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-medium text-themeSecondary">
                    Email us today
                  </p>
                  <p className=" text-themeSecondary">litlang58@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-lg border border-themeSecondary/30">
                  <FiPhoneCall className="w-4 h-4 text-themeSecondary" />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="font-medium text-themeSecondary">
                    Call us today
                  </p>
                  <p className=" text-themeSecondary">+923183920797</p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </PaddingTopWrapper>
    </div>
  );
}

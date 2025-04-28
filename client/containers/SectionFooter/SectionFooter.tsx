"use client";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function SectionFooter() {
  return (
    <section className="w-full h-[611px] bg-white text-white py-12">
      <div className="h-[400px] max-w-[1200px] w-full mx-auto flex items-center justify-between bg-black rounded-lg shadow-lg relative">
     
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected with Pur</h2>
          <p className="text-lg mb-6">
            Your perfect companion is just a connection away.  
            Reach out to us for more information or to find your new furry friend.
          </p>
        </div>
        <div className="w-1/2 h-full relative">
          <div className="h-full w-full relative">
            <Image
              src="/img/img-footer.jpeg"
              alt="Footer Image"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="absolute bottom-4 left-0 -translate-x-4 bg-opacity-70 p-4 rounded-lg shadow-lg z-50 flex justify-between items-start gap-8 w-full w-[695px] rounded-[12px] backdrop-blur-[44px]">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Have any question</h3>
              <p className="text-sm text-gray-300">
                We’re here to help! Reach out to our team.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={20} className="text-[rgba(249,164,24,1)]" />
                <span className="text-white text-sm">+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-[rgba(249,164,24,1)]" />
                <span className="text-white text-sm">contact@pur.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

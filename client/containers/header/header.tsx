"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Header() {
  return (
    <div className="relative w-full h-[1024px] flex overflow-hidden bg-[rgba(17, 11, 15, 1)]">
      <header className="absolute top-4 right-4 z-50">
        <Image src="/img/icon-menu.png" alt="menu" width={40} height={40} />
      </header>
      <div className="absolute top-4 left-4">
        <Image src="/img/icon.png" alt="Icon" width={40} height={40} />
      </div>

      <div className="absolute top-0 left-[137px] h-full w-[2px] bg-[rgba(249,164,24,1)]" />

      <div className="flex flex-col justify-center pl-[137px] w-1/2">
        <div className="ml-[20px] mr-[20px] space-y-8">
          <h1 className="text-5xl font-bold font-limelight">
            Where Bounds <br /> Find Home.
          </h1>
          <p className="text-[rgba(255, 255, 255, 1)] text-lg font-limelight">
            Embrace unconditional love, where bonds blossom and hearts connect.
          </p>
          <button className="px-6 py-3 bg-[rgba(249,164,24,1)] text-white rounded-full hover:bg-orange-600 transition">
            Explore Dogs
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2">
        <Image
          src="/img/dog-acc.png"
          alt="Dog"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="absolute bottom-4 left-[188] w-[700px]">
        <div className="relative h-[283px] bg-[rgba(255, 255, 255, 0.15)] rounded-lg flex items-center justify-center p-4">
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
            <ChevronLeft className="w-6 h-6 text-orange-800" />
          </button>
          
          <div className="flex justify-center gap-4 h-[235px] w-full">
            {["/img/dog-acceuil.jpeg", "/img/dog-acc2.jpeg", "/img/dog-s.jpeg"].map(
              (src, index) => (
                <div key={index} className="w-[191px] h-[235px] relative">
                  <Image
                    src={src}
                    alt={`Dog ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )
            )}
          </div>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
            <ChevronRight className="w-6 h-6 text-orange-800" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex flex-col font-limelight text-[64px] leading-none text-white">
        <span>20</span>
        <span>23</span>
      </div>
    </div>
  );
}

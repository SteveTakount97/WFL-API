"use client";
import Image from "next/image";

export default function GuideByConnection() {
  return (
    <section className="w-full h-auto py-16 bg-[rgba(217,213,204,1)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 h-full">
       
        <div className="w-full sm:w-1/3 h-auto flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src="/img/img-dog1.jpeg"
              alt="Dog 1"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/3 text-center flex flex-col justify-center px-6">
          <h2 className="text-3xl font-bold text-black mb-4">
            Guide by Connection
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            At Pur, we're devoted to guiding your journey.  
            Our team creates connections based on compatibility, lifestyle, and the longing for companionship.  
            Getting a dog is more than an event.
          </p>
          <button className="px-8 py-3 bg-[rgba(249,164,24,1)] text-white rounded-full shadow-lg transition hover:bg-[rgba(249,164,24,0.8)] max-w-[183px] mx-auto">
            Explore dogs
          </button>
        </div>

        <div className="w-full sm:w-1/3 h-auto flex items-center justify-center">
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src="/img/img-dog2.jpeg"
              alt="Dog 2"
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

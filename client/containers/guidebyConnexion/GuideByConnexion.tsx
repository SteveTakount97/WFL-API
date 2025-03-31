"use client";
import Image from "next/image";

export default function GuideByConnection() {
  return (
    <section className="w-full h-[700px] py-16 bg-[rgba(217,213,204,1)]">
      <div className="flex items-center justify-between gap-8 px-4 md:px-16 h-full">
       
        <div className="w-1/3 h-[500px] flex items-center justify-center">
          <Image
            src="/img/img-dog1.jpeg"
            alt="Dog 1"
            width={400}
            height={500}
            objectFit="cover"
            className="object-cover rounded-lg shadow-lg custom-image-height"
          />
        </div>

      
        <div className="w-1/3 text-center flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Guide by Connection
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            At Pur, we're devoted to guiding your journey.  
            Our team creates connections based on compatibility, lifestyle, and the longing for companionship.  
            Getting a dog is more than an event.
          </p>
          <button className="px-8 py-3 bg-[rgba(249,164,24,1)] text-white rounded-full shadow-lg transition hover:bg-[rgba(249,164,24,0.8)]">
            Explore dogs
          </button>
        </div>

        <div className="w-1/3 h-[500px] flex items-center justify-center">
          <Image
            src="/img/img-dog2.jpeg"
            alt="Dog 2"
            width={400}
            height={500}
            objectFit="cover"
            className="object-cover rounded-lg shadow-lg custom-image-height"
          />
        </div>
      </div>
    </section>
  );
}

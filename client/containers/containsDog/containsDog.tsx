"use client";
import Image from "next/image";

export default function ContainsDog() {
  return (
    <section className="w-full h-auto bg-[rgba(31, 25, 27, 1)]">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 p-6 md:p-10 lg:p-[80px] xl:pr-[120px] xl:pl-[120px]">
        <div className="w-full md:w-1/2 px-4">
          <div className="w-full max-w-[391px] p-5 md:p-[20px] md:px-[24px] gap-2 rounded-[8px] bg-[rgba(249,164,24,0.1)] flex items-center">
            <Image src="/img/icon.png" alt="Icon" width={30} height={30} />
            <button className="text-l font-bold text-[rgba(255, 255, 255, 1)] ">
              Unleash Joyful Bonds with Pur
            </button>
          </div>
          <p className="text-lg text-white">
            Our mission is to connect you with the purest love and loyalty that only a dog can offer.  
            Here, we celebrate the extraordinary relationships that light up our lives.
          </p>
        </div>
        {/* Image à droite */}
        <div className="w-full md:w-1/2">
          <Image
            src="/img/img-contain1.jpeg"
            alt="Dog 1"
            width={500}
            height={400}
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-start justify-between gap-8  p-6 md:p-10 lg:p-[80px] xl:pr-[120px] xl:pl-[120px]">
        <div className="w-full md:w-1/2 px-4">
        <div className="w-full max-w-[365px] h-[64px] p-5 md:p-[20px] md:px-[24px] gap-2 rounded-[8px] bg-[rgba(249,164,24,0.1)] flex items-center">
           <Image src="/img/icon.png" alt="Icon" width={30} height={30} />
           <button className="text-xl font-bold text-white text-left">
               A World of Pure Connection
            </button>
        </div>

          <p className="text-lg text-white">
            Pur is more than a platform – it's a celebration of the incredible bond between humans and dogs.  
            Our furry companions bring boundless joy, comfort, and unwavering companionship to every moment.
          </p>
        </div>
        {/* Image à droite */}
        <div className="w-full md:w-1/2">
          <Image
            src="/img/img-contain2.jpeg"
            alt="Dog 2"
            width={500}
            height={400}
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

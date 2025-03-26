"use client";
import Image from "next/image";

export default function ContainsDog() {
  return (
    <section className="w-full h-auto space-y-16">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-1/2 px-4">
          <div className="flex items-start gap-2 mb-4">
            <Image src="/img/icon.png" alt="Icon" width={30} height={30} />
            <span className="text-2xl font-bold text-[rgba(255, 255, 255, 1)]">
              Unleash Joyful Bonds with Pur
            </span>
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

      <div className="flex flex-col md:flex-row-reverse items-start justify-between gap-8">
        <div className="w-full md:w-1/2 px-4">
          <div className="flex items-start gap-2 mb-4">
            <Image src="/img/icon.png" alt="Icon" width={30} height={30} />
            <span className="text-2xl font-bold text-[rgba(255, 255, 255, 1)]">
              A World of Pure Connection
            </span>
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

"use client";
import Image from "next/image";

export default function ViewDog() {
  return (
    <section className="w-full h-auto bg-[rgb(252, 250, 246)]">
      <div className="relative w-full h-[400px] bg-white text-black flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center text-black px-4 md:px-16">
          <div className="flex items-center mb-4">
            <Image src="/img/icon.png" alt="Icon" width={30} height={30} />
            <button className="text-lg font-semibold ml-2">
              Meet our canine stars
            </button>
          </div>
          <p className="text-lg mb-6">
            Dive into a carefully curated selection of exceptional canine
            companions at Pur. Each dog is a unique soul with its own story and
            personality, waiting to become an integral part of your life.
            <br />
            Whether you seek a spirited adventurer or a gentle cuddler, our
            diverse range of breeds guarantees you'll find your perfect match.
          </p>
          <div className="flex gap-4">
            <button className="py-3 px-8 bg-[rgba(249, 164, 24, 1)] text-black rounded-lg shadow-md transition hover:bg-[rgba(249, 164, 24, 0.8)]">
              See All
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 my-16 px-4">
        {["/img/SelectDog1.jpeg", "/img/SelectDog2.jpeg", "/img/SelectDog3.jpeg"].map(
          (src, index) => (
            <div key={index} className="w-full max-w-[350px] h-[350px] relative">
              <Image
                src={src}
                alt={`Dog ${index + 1}`}
                width={350}
                height={350}
                className="object-cover rounded-lg w-full h-full"
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}

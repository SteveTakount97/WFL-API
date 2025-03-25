"use client";
import Image from "next/image";

export default function ViewDog() {
  return (
    <section className="w-full h-auto bg-[rgb(252, 250, 246)]">
      {/* Première Div - Section avec boutons et texte */}
      <div className="relative w-full h-[600px] bg-cover bg-white text-black">
        {/* Overlay pour assombrir l'image de fond */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-black px-4">
          <button className="px-8 py-3 rounded-full transition mb-4 bg-[rgba(249, 164, 24, 1)] ">
           <Image src="/img/icon.png" alt="Icon" width={20} height={20} /> Meet Our Canine Stars
          </button>
          <p className="text-lg mb-6">Dive into a carefully curated selection of exceptional canine companions at Pur. Each dog is a unique soul with its own story and personality, waiting to become an integral part of your life. 
          <br/>Whether you seek a spirited adventurer or a gentle cuddler, our diverse range of breeds guarantees you'll find your perfect match.</p>
          {/* Premier bouton */}
          <button className="px-8 py-3 bg-[rgba(249, 164, 24, 1)] text-black rounded-full transition mb-4">
            View Dog
          </button>
        </div>
      </div>

      {/* Seconde Div - Images des chiens */}
      <div className="flex justify-center gap-8 my-16 px-4">
        <div className="w-full max-w-[350px] h-[350px] relative">
          <Image
            src="/img/dog1.jpg"
            alt="Dog 1"
            width={350}
            height={350}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="w-full max-w-[350px] h-[350px] relative">
          <Image
            src="/img/dog2.jpg"
            alt="Dog 2"
            width={350}
            height={350}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="w-full max-w-[350px] h-[350px] relative">
          <Image
            src="/img/dog3.jpg"
            alt="Dog 3"
            width={350}
            height={350}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";

export default function SelectDog() {
  return (
    <div className="relative w-full h-[1264px] bg-cover bg-center bg-[url('/img/dog-s.jpeg')]">
      {/* Overlay pour assombrir l'image de fond */}
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold">Select Your Dog</h1>
        <p className="text-lg mt-4">Choose your new best friend from our collection.</p>
      </div>
    </div>
  );
}

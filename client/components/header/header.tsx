"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/dog1.jpg", "/dog2.jpg", "/dog3.jpg"];

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[1024px] flex overflow-hidden bg-[rgba(17, 11, 15, 1)]">
      {/* Icône en haut à gauche */}
      <div className="absolute top-4 left-4">
        <Image src="/img/icon.png" alt="Icon" width={40} height={40} />
      </div>

      {/* Trait vertical */}
      <div className="absolute top-0 left-[137px] h-full w-[2px] bg-[rgba(249,164,24,1)]" />

      {/* Contenu à gauche */}
      <div className="flex flex-col justify-center pl-[137px] w-1/2">
        <div className="ml-[20px] mr-[20px] space-y-8">
          {/* Texte principal */}
          <h1 className="text-5xl font-bold">
            Where Bounds <br/>Find Home.
          </h1>
          <p className="text-[rgba(255, 255, 255, 1)] text-lg">
          Embrace unconditional love, where bonds blossom and hearts connect. 
          </p>

          {/* Bouton */}
          <button className="px-6 py-3 bg-[rgba(249,164,24,1)] text-white rounded-full hover:bg-orange-600 transition">
            Explore Dogs
          </button>
        </div>
      </div>

      {/* Image Dog à droite */}
      <div className="absolute right-0 top-0 h-full w-1/2">
        <Image
          src="/img/dog-acceuil.jpeg"
          alt="Dog"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Carrousel en bas */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-[700px]">
        <div className="relative">
          {/* Flèche gauche */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          {/* Images */}
          <div className="flex overflow-hidden rounded-lg">
            {images.map((img, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 transition-transform duration-300 ${
                  index === currentIndex ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <Image
                  src={img}
                  alt={`Dog ${index + 1}`}
                  width={649}
                  height={283}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>

          {/* Flèche droite */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
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

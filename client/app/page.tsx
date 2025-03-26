import Image from "next/image";
import Footer from "@/components/footer/Footer";
import Header from "@/containers/header/header";
import SelectDog from "@/containers/selectDog/SelectDog";
import ViewDog from "@/containers/VieuwDog/VieuwDog";
import ContainsDog from "@/containers/containsDog/containsDog";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-16  font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 flex-1 items-center sm:items-start">
      {/* Contenu principal */}
     <Header/>
     <SelectDog/>
     <ViewDog/>
     <ContainsDog />
    </main>
  
    {/* Footer*/}
    <Footer />
  </div>
  );
}

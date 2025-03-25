import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full max-w-[1440px] h-[368px] mx-auto px-6 flex items-center justify-center">
      <div className="w-full max-w-[1151px] h-[207px] flex flex-col md:flex-row justify-between items-start">
        {/* Bloc gauche */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Pur Teams</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about-us" className="hover:text-gray-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/work-with-us" className="hover:text-gray-400 transition">
                Work With Us
              </a>
            </li>
          </ul>
          {/* Icônes réseaux sociaux */}
          <div className="flex mt-4 space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Bloc droite */}
        <div className="mt-6 md:mt-0">
          <Image src="/img/icon.png" alt="Icon" width={20} height={20} />
          <h2 className="text-lg font-semibold">Company</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

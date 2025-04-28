import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[rgba(31, 25, 27, 1)] text-white w-full max-w-[1440px] min-h-[368px] mx-auto px-6 flex flex-col justify-between">
     
      <div className="w-full max-w-[1151px] h-full flex flex-col justify-between mx-auto py-8">
        <div className="flex justify-between items-start">
          {/* Colonne 1 */}
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
          <div className="flex items-center mt-6 md:mt-0">
            <Image src="/img/icon.png" alt="Icon" width={30} height={30} />
            <h2 className="text-lg font-semibold ml-2">Company</h2>
          </div>
        </div>
        
        <div className="w-full mt-8 flex items-center justify-between text-sm">

          <div className="text-gray-400">
            <a href="/terms" className="hover:text-gray-200 transition mr-4">
              Terms of Use
            </a>
            &amp;
            <a href="/privacy" className="hover:text-gray-200 transition ml-4">
              Privacy Policy
            </a>
          </div>
          <div className="text-gray-400">
            ©2022 Pur Team. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

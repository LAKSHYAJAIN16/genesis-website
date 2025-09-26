'use client';
import { FaXTwitter } from 'react-icons/fa6';
import { FaMedium, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const social = [
    { name: 'X (Twitter)', icon: FaXTwitter, href: '#' },
    { name: 'Medium', icon: FaMedium, href: '#' },
    { name: 'Instagram', icon: FaInstagram, href: '#' },
  ];

  return (
    <footer className="relative text-white py-16 overflow-hidden">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[200px] md:text-[300px] font-bold opacity-5">
          GENESIS
        </span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          {/* Left side - Logo and copyright */}
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-light mb-2">GENESIS</div>
            <p className="text-gray-400 text-sm">© {currentYear} Genesis. All rights reserved.</p>
          </div>
          
          {/* Right side - Social links */}
          <div className="text-right">
            <h3 className="text-gray-400 text-sm mb-4">Social</h3>
            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

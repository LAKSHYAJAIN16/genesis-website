'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaMedium } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const social = [
    { name: 'GitHub', icon: FaGithub, href: '#' },
    { name: 'LinkedIn', icon: FaLinkedin, href: '#' },
    { name: 'X (Twitter)', icon: FaXTwitter, href: '#' },
    { name: 'Medium', icon: FaMedium, href: '#' },
  ];

  const links = [
    { title: 'About', items: ['Our Story', 'Team', 'Partners', 'Testimonials'] },
    { title: 'Resources', items: ['Blog', 'Guides', 'Documentation', 'FAQ'] },
    { title: 'Legal', items: ['Privacy Policy', 'Terms of Service', 'Code of Conduct', 'Contact'] },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              GENESIS
            </h2>
            <p className="text-sm text-gray-400">
              Canada's first high school buildathon. From idea to startup in 48 hours.
            </p>
            <div className="flex space-x-4 pt-2">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:-translate-y-1"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {links.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Contact Us
            </h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <FaEnvelope className="h-4 w-4 mt-1 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-400 hover:text-white transition-colors">
                  contact@genesis.build
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="h-4 w-4 mt-1 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  Toronto, ON<br />
                  Canada
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright and bottom links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <p className="text-xs text-gray-500">
            © {currentYear} Genesis. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/code-of-conduct" className="text-xs text-gray-500 hover:text-white transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

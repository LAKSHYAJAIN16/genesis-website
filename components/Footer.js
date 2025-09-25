'use client';

import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'FAQ', href: '#faq' },
  ];

  const social = [
    { name: 'GitHub', icon: FaGithub, href: '#' },
    { name: 'LinkedIn', icon: FaLinkedin, href: '#' },
    { name: 'Twitter', icon: FaTwitter, href: '#' },
    { name: 'Email', icon: FaEnvelope, href: 'mailto:hello@genesis.com' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Main content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="flex flex-col items-center mb-12">
            <div className="mb-8">
              <span className="text-2xl font-light tracking-wider">GENESIS</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              )}
            </div>

            {/* Social links */}
            <div className="flex space-x-6 mb-8">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="text-center mb-8">
              <a 
                href="mailto:hello@genesis.ca" 
                className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
              >
                hello@genesis.ca
              </a>
            </div>
          </nav>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-gray-600">
              © {currentYear} Genesis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

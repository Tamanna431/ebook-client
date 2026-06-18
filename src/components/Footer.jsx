'use client';

import Link from 'next/link';
import { FaBookOpen, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { footerLinks } from '@/utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
                <FaBookOpen className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Fable
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Discover and read original ebooks from talented writers around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-violet-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li><Link href="/browse" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Browse Ebooks</Link></li>
              <li><Link href="/writers" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Top Writers</Link></li>
              <li><Link href="/genres" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">Genres</Link></li>
              <li><Link href="/new-releases" className="text-gray-400 hover:text-violet-400 transition-colors text-sm">New Releases</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new ebooks and features.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium text-sm hover:from-violet-700 hover:to-blue-700 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Fable. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            {footerLinks.socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-violet-400 transition-colors"
                aria-label={social.name}
              >
                {social.name === 'Facebook' && <FaFacebook size={20} />}
                {social.name === 'Twitter' && <FaTwitter size={20} />}
                {social.name === 'Instagram' && <FaInstagram size={20} />}
                {social.name === 'LinkedIn' && <FaLinkedin size={20} />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
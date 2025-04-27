import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-1 sm:col-span-2">
            <Logo className="mb-4" />
            <p className="text-gray-600 max-w-md text-sm sm:text-base">
              Secure document verification platform powered by blockchain technology.
              Verify the authenticity of your documents with confidence.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="/" className="text-gray-600 hover:text-blue-500">Home</a></li>
              <li><a href="/verify" className="text-gray-600 hover:text-blue-500">Verify Document</a></li>
              <li><a href="/admin" className="text-gray-600 hover:text-blue-500">Register Document</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="text-gray-600">support@ogdoc.com</li>
              <li className="text-gray-600">+91 79019 82476</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} OG Doc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
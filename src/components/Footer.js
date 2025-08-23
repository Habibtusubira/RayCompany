import React from 'react';

const Footer = ({ siteContent }) => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; 2024 {siteContent.companyName} {siteContent.subtitle}. All rights reserved.</p>
        <p className="text-gray-400 text-sm mt-2">Built with passion for architectural excellence</p>
      </div>
    </footer>
  );
};

export default Footer;
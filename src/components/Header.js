import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Header = ({ siteContent, editMode, updateContact }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="lg:hidden">
          {/* Empty div for spacing on mobile */}
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone size={16} />
              {editMode ? (
                <input
                  type="text"
                  value={siteContent.contacts.phone1}
                  onChange={(e) => updateContact('phone1', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-24"
                />
              ) : (
                <span>{siteContent.contacts.phone1}</span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={16} />
              {editMode ? (
                <input
                  type="email"
                  value={siteContent.contacts.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-xs w-40"
                />
              ) : (
                <span>{siteContent.contacts.email}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
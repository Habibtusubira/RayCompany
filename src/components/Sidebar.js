import React from 'react';
import { X, User, Edit3, LogOut, Menu } from 'lucide-react';

const Sidebar = ({ isMenuOpen, setIsMenuOpen, isLoggedIn, setShowLogin, editMode, setEditMode, handleLogout }) => {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Horizontal Top Navigation Bar with Glass Effect */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#1B263B]/80 backdrop-blur-md border-b border-[#778DA9]/30 shadow-lg z-50">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-xl font-bold text-[#E0E1DD]">ERGONOMICS</div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors">Home</a>
            <a href="#about" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors">About</a>
            <a href="#services" className="text-[#E1E1DD] hover:text-[#778DA9] font-medium transition-colors">Services</a>
            <a href="#projects" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors">Projects</a>
            <a href="#contact" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors">Contact</a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center space-x-1 bg-[#415A77] text-[#E0E1DD] px-3 py-1.5 rounded text-sm hover:bg-[#778DA9] transition-colors"
                >
                  <Edit3 size={16} />
                  <span>{editMode ? 'View Mode' : 'Edit Mode'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-[#778DA9] text-[#E0E1DD] px-3 py-1.5 rounded text-sm hover:bg-[#415A77] transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-1 bg-[#415A77] text-[#E0E1DD] px-3 py-1.5 rounded text-sm hover:bg-[#778DA9] transition-colors"
              >
                <User size={16} />
                <span>Admin Login</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-[#1B263B]/50"
            >
              <Menu size={24} className="text-[#E0E1DD]" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar with Glass Effect */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-[#1B263B]/95 backdrop-blur-md shadow-lg transform transition-transform z-50 lg:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-[#778DA9]/30">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#E0E1DD]">Navigation</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} className="text-[#E0E1DD]" />
            </button>
          </div>
        </div>
        <nav className="p-6">
          <ul className="space-y-4">
            <li><a href="#home" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#services" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Services</a></li>
            <li><a href="#projects" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
            <li><a href="#contact" className="text-[#E0E1DD] hover:text-[#778DA9] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          {isLoggedIn ? (
            <div className="space-y-2">
              <button
                onClick={() => { setEditMode(!editMode); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-2 bg-[#415A77] text-[#E0E1DD] px-4 py-2 rounded hover:bg-[#778DA9] transition-colors"
              >
                <Edit3 size={18} />
                <span>{editMode ? 'View Mode' : 'Edit Mode'}</span>
              </button>
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-2 bg-[#778DA9] text-[#E0E1DD] px-4 py-2 rounded hover:bg-[#415A77] transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setShowLogin(true); setIsMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 bg-[#415A77] text-[#E0E1DD] px-4 py-2 rounded hover:bg-[#778DA9] transition-colors"
            >
              <User size={18} />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
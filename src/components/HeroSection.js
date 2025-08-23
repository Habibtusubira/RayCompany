import React, { useRef } from 'react';
import { Upload, Camera } from 'lucide-react';

const HeroSection = ({ siteContent, editMode, updateContent }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateContent('heroImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <section id="home" className="relative py-32 text-[#E0E1DD] overflow-hidden min-h-screen flex items-center">
      {/* Hero Image Background */}
      {siteContent.heroImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${siteContent.heroImage})` }}
        >
          <div className="absolute inset-0 bg-[#0D1B2A] opacity-80"></div>
        </div>
      )}
      
      {/* Default background if no image */}
      {!siteContent.heroImage && (
        <div className="absolute inset-0 bg-[#0D1B2A]">
          <div className="absolute inset-0 bg-[#1B263B] opacity-20"></div>
        </div>
      )}
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="bg-[#1B263B]/70 backdrop-blur-md rounded-2xl p-12 border border-[#778DA9]/30 shadow-2xl max-w-4xl mx-auto relative">
          {/* Image Upload Button */}
          {editMode && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="absolute -top-4 -right-4 bg-[#415A77] text-[#E0E1DD] p-3 rounded-full hover:bg-[#778DA9] transition-colors flex items-center justify-center shadow-lg"
                title="Change background image"
              >
                <Camera size={24} />
              </button>
            </>
          )}

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {editMode ? (
              <input
                type="text"
                value={siteContent.companyName}
                onChange={(e) => updateContent('companyName', e.target.value)}
                className="bg-transparent border-b-2 border-[#778DA9]/30 text-center text-[#E0E1DD] placeholder-[#E0E1DD]/70 w-full max-w-lg"
              />
            ) : (
              siteContent.companyName
            )}
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-[#778DA9]">
            {editMode ? (
              <input
                type="text"
                value={siteContent.subtitle}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="bg-transparent border-b border-[#778DA9]/30 text-center text-[#778DA9] placeholder-[#778DA9]/70 w-full max-w-md"
              />
            ) : (
              siteContent.subtitle
            )}
          </p>
          <p className="text-lg mb-8 text-[#E0E1DD]">
            {editMode ? (
              <input
                type="text"
                value={siteContent.slogan}
                onChange={(e) => updateContent('slogan', e.target.value)}
                className="bg-transparent border-b border-[#778DA9]/30 text-center text-[#E0E1DD] placeholder-[#E0E1DD]/70 w-full max-w-xl"
              />
            ) : (
              siteContent.slogan
            )}
          </p>
          <div className="max-w-3xl mx-auto">
            {editMode ? (
              <textarea
                value={siteContent.description}
                onChange={(e) => updateContent('description', e.target.value)}
                className="bg-transparent border border-[#778DA9]/30 rounded p-3 text-[#E0E1DD] placeholder-[#E0E1DD]/70 w-full resize-none"
                rows="3"
              />
            ) : (
              <p className="text-lg leading-relaxed text-[#E0E1DD]">{siteContent.description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
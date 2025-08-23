import React from 'react';

const ServicesSection = ({ siteContent, editMode, updateContent }) => {
  const updateService = (index, newValue) => {
    const updatedServices = [...siteContent.services];
    updatedServices[index] = newValue;
    updateContent('services', updatedServices);
  };

  const addService = () => {
    const updatedServices = [...siteContent.services, 'New Service'];
    updateContent('services', updatedServices);
  };

  const removeService = (index) => {
    const updatedServices = siteContent.services.filter((_, i) => i !== index);
    updateContent('services', updatedServices);
  };

  return (
    <section id="services" className="py-20 bg-[#0D1B2A]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#E0E1DD]">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteContent.services.map((service, index) => (
            <div key={index} className="bg-[#1B263B]/70 backdrop-blur-md p-6 rounded-lg text-center hover:shadow-lg transition-all border border-[#778DA9]/30">
              {editMode ? (
                <div className="flex flex-col space-y-3">
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => updateService(index, e.target.value)}
                    className="w-full border border-[#778DA9]/30 rounded px-3 py-2 bg-[#1B263B] text-[#E0E1DD] text-center font-semibold"
                  />
                  <button
                    onClick={() => removeService(index)}
                    className="bg-[#778DA9] text-[#0D1B2A] px-3 py-1 rounded text-sm hover:bg-[#E0E1DD] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-[#E0E1DD]">{service}</h3>
                  <p className="text-[#778DA9]">Professional {service.toLowerCase()} services tailored to your needs.</p>
                </>
              )}
            </div>
          ))}
          {editMode && (
            <div className="bg-[#1B263B]/70 backdrop-blur-md p-6 rounded-lg text-center border border-[#778DA9]/30 border-dashed flex items-center justify-center">
              <button
                onClick={addService}
                className="text-[#778DA9] hover:text-[#E0E1DD] transition-colors"
              >
                + Add Service
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
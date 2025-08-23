import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ContactSection = ({ siteContent, editMode, updateContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Store in Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          submitted_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Optional: Send email notification
      await sendEmailNotification(formData);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  const sendEmailNotification = async (formData) => {
    // You can integrate with email services here
    // See option 2 below for implementation
  };

  return (
    <section id="contact" className="py-20 bg-[#1B263B]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#E0E1DD]">Get In Touch</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[#E0E1DD]">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone size={20} className="text-[#778DA9]" />
                  <div>
                    {editMode ? (
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={siteContent.contacts.phone1}
                          onChange={(e) => updateContact('phone1', e.target.value)}
                          className="bg-transparent border-b border-[#778DA9]/30 text-[#E0E1DD] w-full"
                        />
                        <input
                          type="text"
                          value={siteContent.contacts.phone2}
                          onChange={(e) => updateContact('phone2', e.target.value)}
                          className="bg-transparent border-b border-[#778DA9]/30 text-[#E0E1DD] w-full"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#E0E1DD]">{siteContent.contacts.phone1}</p>
                        <p className="text-[#E0E1DD]">{siteContent.contacts.phone2}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-[#778DA9]" />
                  {editMode ? (
                    <input
                      type="email"
                      value={siteContent.contacts.email}
                      onChange={(e) => updateContact('email', e.target.value)}
                      className="bg-transparent border-b border-[#778DA9]/30 text-[#E0E1DD] w-full"
                    />
                  ) : (
                    <span className="text-[#E0E1DD]">{siteContent.contacts.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-[#778DA9]" />
                  {editMode ? (
                    <input
                      type="text"
                      value={siteContent.contacts.location}
                      onChange={(e) => updateContact('location', e.target.value)}
                      className="bg-transparent border-b border-[#778DA9]/30 text-[#E0E1DD] w-full"
                    />
                  ) : (
                    <span className="text-[#E0E1DD]">{siteContent.contacts.location}</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[#E0E1DD]">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-[#0D1B2A] border border-[#778DA9]/30 rounded-lg text-[#E0E1DD] placeholder-[#778DA9] focus:outline-none focus:ring-2 focus:ring-[#778DA9]"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-[#0D1B2A] border border-[#778DA9]/30 rounded-lg text-[#E0E1DD] placeholder-[#778DA9] focus:outline-none focus:ring-2 focus:ring-[#778DA9]"
                  required
                  disabled={isSubmitting}
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 bg-[#0D1B2A] border border-[#778DA9]/30 rounded-lg text-[#E0E1DD] placeholder-[#778DA9] focus:outline-none focus:ring-2 focus:ring-[#778DA9] resize-none"
                  required
                  disabled={isSubmitting}
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#415A77] text-[#E0E1DD] py-3 px-6 rounded-lg font-semibold hover:bg-[#778DA9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-center">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;